import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  PersonalInformation,
  User,
  UserActivity,
  UserHistory,
} from '../models';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { FileUploadService } from '../utils/file-upload.service';
import { CustomLoggerService } from '../utils/logger.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    // @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy, // @Inject('TEST') private readonly client2: ClientProxy,
    private fileUploadService: FileUploadService,
    private customLoggerService: CustomLoggerService,
  ) {}

  public errorMessage() {
    return new HttpException(
      'There is a problem. Please try to login again later.',
      HttpStatus.NOT_FOUND,
    );
  }

  public async getUser(id: string): Promise<User | HttpException> {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
      include: { personalInformation: true, userHistories: true },
    });
    if (user) {
      return user;
    } else {
      throw this.errorMessage();
    }
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  public async getUserPersonalInformation(
    userId: string,
  ): Promise<PersonalInformation | HttpException> {
    const personalInformation: PersonalInformation =
      await this.prisma.personalInformation.findUnique({
        where: { userId: userId },
      });
    if (personalInformation) {
      return personalInformation;
    } else {
      return this.errorMessage();
    }
  }

  public async createUserPersonalInformation(
    personalIBody: PersonalInformation,
  ): Promise<PersonalInformation | HttpException> {
    const personalInformation: PersonalInformation =
      await this.prisma.personalInformation.create({
        data: personalIBody,
      });
    if (personalInformation) {
      return personalInformation;
    } else {
      return this.errorMessage();
    }
  }

  public async updateUserPersonalInformation(
    personalIBody: PersonalInformation,
  ) {
    const personalInformation: PersonalInformation =
      await this.prisma.personalInformation.update({
        where: { userId: personalIBody.userId },
        data: {
          birthDay: personalIBody.birthDay,
          goal: personalIBody.goal,
          height: personalIBody.height,
          weight: personalIBody.weight,
          gender: personalIBody.gender,
        },
      });
    if (personalInformation) {
      return personalInformation;
    } else {
      return this.errorMessage();
    }
  }

  public async addUser(body: any): Promise<boolean> {
    try {
      await this.prisma.user.create({ data: body });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
    return false;
  }

  public async updateUserById(userId: string, user: User) {
    if (user.password) {
      user.password = await this.hashPassword(user.password);
    }
    const userRes: User = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...user,
      },
    });
    if (userRes) {
      return userRes;
    } else {
      return this.errorMessage();
    }
  }

  public deleteUser(userId: string): void {
    this.prisma.user
      .delete({
        where: { id: userId },
        include: {
          personalInformation: true,
          userHistories: true,
          posts: true,
          postComments: true,
          userActivities: true,
        },
      })
      .then(() => {
        console.log('delete is successfully');
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }

  hashPassword(data: string) {
    return bcrypt.hash(data, 16);
  }

  async getMyProfile(userId: string): Promise<User | HttpException> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          personalInformation: true,
          userActivities: true,
          userHistories: true,
        },
      });
      if (!user) {
        throw new HttpException(
          'User not found. Please login to the system again.',
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      console.error('error: ', error);
      throw new HttpException(
        'User not found. Please login to the system again.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async changeProfilePhoto(file: File, userId: string) {
    try {
      const res: any = await this.fileUploadService.upload(
        file,
        'profileImages',
      );
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          profilePhoto: res.Location,
        },
      });
      return { location: res.Location };
    } catch (error) {
      console.error('error: ', error);
      throw new HttpException(
        'There was a problem during the uploading. Please try again later.',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }

  public async changePassword(password: string, userId: string): Promise<void> {
    try {
      const hashedPassword = await this.hashPassword(password);
      await this.prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
    } catch (error) {
      throw new HttpException(
        'There is a problem. Please try to login again later.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async changeNotificationStatus(userId: string): Promise<void> {
    const user: User = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    await this.prisma.user.update({
      where: { id: userId },
      data: { isNotifyActive: !user.isNotifyActive },
    });
  }

  public async leaderboard(userId: string): Promise<LeaderBoardDTO> {
    try {
      const today: Date = new Date();
      const lastWeek: Date = new Date(today.getTime() - 604800 * 1000);
      const userHistories: UserHistory[] =
        await this.prisma.userHistory.findMany({
          where: {
            creationDate: {
              lt: today,
              gt: lastWeek,
            },
          },
        });
      console.log('userHistories: ', userHistories);

      const stats: any = {};
      userHistories.forEach((userHistory: UserHistory) => {
        if (stats[userHistory.userId]) {
          stats[userHistory.userId] += userHistory.activityCalorie;
        } else {
          stats[userHistory.userId] = userHistory.activityCalorie;
        }
      });

      const sortStats = Object.entries(stats)
        .sort(([, a]: any, [, b]: any) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

      let myOrder = Object.keys(sortStats).indexOf(userId);
      if (!myOrder || myOrder == -1) {
        myOrder = await this.prisma.user.count();
      }

      const finalStats: Order[] = [];
      for (let i = 0; i < 10; i++) {
        if (Object.keys(sortStats)[i]) {
          const _user: any = await this.prisma.user.findUnique({
            where: { id: Object.keys(sortStats)[i] },
            select: { id: true, username: true },
          });
          finalStats[_user.username] = Object.values(sortStats)[i];
          finalStats.push({
            name: _user.username,
            score: Number(Object.values(sortStats)[i]),
          });
        } else {
          break;
        }
      }

      const response: LeaderBoardDTO = {
        orders: finalStats,
        myOrder: myOrder,
      };
      return response;
    } catch (error) {
      console.log('error: ', error);
      throw new Error('An error occurred in the sorting.');
    }
  }

  public async myScore(userId: string): Promise<MyScore> {
    try {
      const today: Date = new Date();
      const yesterday: Date = new Date(today.getTime() - 86400 * 1000);
      const userActivities: UserActivity[] =
        await this.prisma.userActivity.findMany({
          where: {
            userId: userId,
            creationDate: {
              lt: today,
              gt: yesterday,
            },
          },
        });
      let totalCalorie = 0;
      userActivities.map(
        (userActivity: UserActivity) =>
          (totalCalorie += userActivity.activityCalorie ?? 0),
      );
      const myScore: MyScore = {
        score: totalCalorie,
      };
      return myScore;
    } catch (error) {
      console.log('error: ', error);
      throw new Error('There was a problem calculating the score.');
    }
  }

  // public async migrationUserForRole(): Promise<void> {
  //   const users: User[] = await this.prisma.user.findMany();
  //   users.forEach(async (user: User) => {
  //     await this.prisma.user.update({
  //       where: { id: user.id },
  //       data: { role: 'user' },
  //     });
  //   });
  // }

  public testRabbitMQ() {
    try {
      console.log('gönderildi');
      // this.client.emit('deneme', { name: 'furkan' });
      // this.client2.emit('hadi_bakalım', { name: 'kemal' });
      // this.httpSvc.get('http://localhost:5000').subscribe();
    } catch (error) {
      console.log('test: ', error);
    }
  }

  public furkan(body: any): any {
    console.log('name: ', body);
    // return this.customLoggerService.successLog(
    //   'işlem başarıyla gerçekleşmiştir...',
    // );
    return {
      id: 123,
      name: body.name,
    };
  }

  public async getMyStats(userId: string): Promise<UserHistory[]> {
    const today: Date = new Date();
    const oneWeekAgo: Date = new Date(today.getTime() - 7 * 86400 * 1000);
    const userHistories: UserHistory[] = await this.prisma.userHistory.findMany(
      {
        where: {
          userId: userId,
          creationDate: {
            lt: today,
            gt: oneWeekAgo,
          },
        },
      },
    );
    return userHistories;
  }
}

export interface LeaderBoardDTO {
  orders?: Order[]; // { username: order, ...}
  myOrder?: number;
}

export interface MyScore {
  score: number;
}

export interface Order {
  name?: string;
  score?: number;
}
