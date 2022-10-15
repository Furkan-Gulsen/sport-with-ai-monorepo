import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { User } from 'src/models';
import { AuthService } from './auth.service';
import { Public } from '../decorators';
import { AtGuard } from '../guards';
import { SignInDto } from './dto/sigin.dto';
import { TokenData } from './dto/token-data';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sendActivationCode')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: User || HttpException })
  sendActivationCode(
    @Query('username') username: string,
    @Query('email') email: string,
  ): Promise<any> {
    console.log(username);
    console.log(email);

    return this.authService.sendActivationCode(username, email);
  }

  @Public()
  @Post('signup')
  // @HttpCode(HttpStatus.CREATED)
  // @ApiCreatedResponse({ type: User || HttpException })
  signup(@Body() dto: any): Promise<{ token: string } | HttpException> {
    return this.authService.signup(dto);
  }

  @Public()
  @Patch('signin')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: TokenData || HttpException })
  signin(@Body() dto: SignInDto): Promise<TokenData | HttpException> {
    return this.authService.signin(dto);
  }

  @UseGuards(AtGuard)
  @Patch('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Query() query: { userId: string }): Promise<any> {
    return this.authService.logout(query.userId);
  }

  // @Public()
  // @UseGuards(RtGuard)
  // @Post('refresh')
  // @HttpCode(HttpStatus.OK)
  // refreshTokens(
  //   @GetCurrentUserId() userId: string,
  //   @GetCurrentUser('refreshToken') refreshToken: string,
  // ): Promise<TokenData> {
  //   return this.authService.refreshTokens(userId, refreshToken);
  // }
}
