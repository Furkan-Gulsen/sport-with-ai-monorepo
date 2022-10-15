import {
  ForbiddenException,
  HttpException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PersonalInformation, User } from '../models';
import { SignInDto } from './dto/sigin.dto';
import { TokenData } from './dto/token-data';
import { MailerService } from '@nestjs-modules/mailer';
import { activation_code_email_template } from '../assets/activation-code-email-template';
import { CustomLoggerService } from '../utils/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
    private customLoggerService: CustomLoggerService,
  ) {}

  generateActivationCode(): number {
    let maxNum: number = 9999;
    let minNum: number = 1000;
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
  }

  async sendActivationCode(username: string, email: string): Promise<any> {
    // check username
    const usernameCheck: User = await this.prisma.user.findUnique({
      where: { username: username },
    });
    const emailCheck: User = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (usernameCheck !== null) {
      throw new HttpException(
        'There is a user with this username. Please change your username.',
        HttpStatus.CONFLICT,
      );
    } else if (emailCheck !== null) {
      throw new HttpException(
        'There is a user with this email. Please change your email.',
        HttpStatus.CONFLICT,
      );
    } else {
      const activationCode = this.generateActivationCode();
      this.mailerService
        .sendMail({
          to: email,
          from: 'sportwithai@gmail.com',
          subject: 'Testing Nest MailerModule ✔',
          html: activation_code_email_template(activationCode),
        })
        .then((success) => {
          console.log(success);
        })
        .catch((err) => {
          console.log(err);
        });

      console.log('activationCode: ', activationCode);
      return {
        activationCode: activationCode,
      };
    }
  }

  async signup(
    userDto: User | PersonalInformation | any,
  ): Promise<{ token: string } | HttpException> {
    const password = await this.hashPassword(userDto.password);
    try {
      const newUser: any = await this.prisma.user.create({
        data: {
          email: userDto.email,
          username: userDto.username,
          password: password,
          personalInformation: {
            create: {
              birthDay: userDto.birthDay,
              weight: userDto.weight || 160,
              height: userDto.height ?? 60,
              goal: userDto.goal ?? 'lose weight',
              gender: userDto.gender ?? '',
            },
          },
        },
        include: {
          personalInformation: true,
        },
      });
      const tokenData = await this.getToken(newUser.id, newUser.email);
      newUser.token = tokenData.token;
      this.customLoggerService.successLog(
        `New user registered. Username: ${userDto.username}`,
      );
      await this.updateToken(newUser.id, tokenData.token);
      return { token: tokenData.token };
    } catch (error) {
      this.customLoggerService.successLog(
        `There was a problem while registering. Error: ${error}`,
      );
      return new HttpException(
        'There is a user with this email address or username. Please enter different values.',
        HttpStatus.CONFLICT,
      );
    }
  }

  async signin(dto: SignInDto): Promise<TokenData | HttpException> {
    let user: User;
    if (dto.email) {
      user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
    } else if (dto.username) {
      user = await this.prisma.user.findUnique({
        where: { username: dto.username },
      });
    } else {
      return new HttpException(
        'There is a problem. Please try to login again later.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (!user)
      throw new ForbiddenException(`No such user was found in the system. Please make sure you have entered your 
        username or e-mail correctly.`);
    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches)
      throw new ForbiddenException(
        `Your password is incorrect. Please make sure you entered your password correctly.`,
      );

    const tokenData = await this.getToken(user.id, user.email);
    await this.updateToken(user.id, tokenData.token);
    this.customLoggerService.successLog(
      `The user is logged into the system. Username/Email: ${
        dto.username ?? dto.email
      }`,
    );
    return tokenData;
  }

  async logout(userId: string): Promise<any> {
    try {
      await this.prisma.user.updateMany({
        where: {
          id: userId,
          token: {
            not: null,
          },
        },
        data: {
          token: null,
        },
      });
      this.customLoggerService.successLog(
        `The user has logged out of the system. userId: ${userId}`,
      );
      return { status: true };
    } catch (error) {
      console.log('error: ', error);
      return { status: false };
    }
  }

  async refreshTokens(userId: string, rt: string): Promise<TokenData> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.password) throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, user.password);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const token = await this.getToken(user.id, user.email);
    // await this.updateRtHash(user.id, tokens.refresh_token);
    return token;
  }

  async updateToken(userId: string, token: string) {
    // const hash = await this.hashData(token);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        token: token,
      },
    });
  }

  hashPassword(data: string) {
    return bcrypt.hash(data, 16);
  }

  async validateUser(token: string): Promise<any> {
    try {
      const user = await this.prisma.user.findMany({
        where: {
          token,
        },
      });
      if (user) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('error: ', error);
      return false;
    }
  }

  async getToken(userId: string, email: string): Promise<TokenData> {
    const date: number = Date.now();
    const [token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          date,
        },
        {
          secret: 'sai-backend-api-token',
          expiresIn: 60 * 60 * 24 * 1, // 1 day
        },
      ),
    ]);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        token: token,
      },
    });
    return {
      token: token,
    };
  }
}
