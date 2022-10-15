import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RtGuard } from '../guards';
import { PersonalInformation, User, UserHistory } from '../models';
import { LeaderBoardDTO, MyScore, UserService } from './user.service';
import RoleGuard from '../guards/role.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user/:userId')
  @UseGuards(RtGuard)
  getUser(@Param('userId') userId: string): Promise<User | HttpException> {
    return this.userService.getUser(userId);
  }

  @Patch('user')
  @UseGuards(RtGuard)
  updateUser(
    @Req() request,
    @Body() userBody: any,
  ): Promise<User | HttpException> {
    return this.userService.updateUserById(request.user.sub, userBody);
  }

  @Patch('admin/user/:userId')
  @UseGuards(RtGuard, RoleGuard('admin'))
  updateUserForAdmin(
    @Param('userId') userId: string,
    @Body() userBody: any,
  ): Promise<User | HttpException> {
    return this.userService.updateUserById(userId, userBody);
  }

  @Get('user/personal-information')
  @UseGuards(RtGuard)
  getUserPersonalInformation(
    @Req() request,
  ): Promise<PersonalInformation | HttpException> {
    return this.userService.getUserPersonalInformation(request.user.sub);
  }

  @Post('user/personal-information')
  @UseGuards(RtGuard)
  createUserPersonalInformation(
    @Req() request,
    @Body() personalIBody: PersonalInformation,
  ): Promise<PersonalInformation | HttpException> {
    personalIBody.userId = request.user.sub;
    return this.userService.createUserPersonalInformation(personalIBody);
  }

  @Patch('user/personal-information')
  @UseGuards(RtGuard)
  updateUserPersonalInformation(
    @Req() request,
    @Body() personalIBody: PersonalInformation,
  ): Promise<PersonalInformation | HttpException> {
    personalIBody.userId = request.user.sub;
    return this.userService.updateUserPersonalInformation(personalIBody);
  }

  @Patch('user/profile-image')
  @UseGuards(RtGuard)
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  changeProfilePhoto(@UploadedFile('file') file, @Req() request) {
    return this.userService.changeProfilePhoto(file, request.user.sub);
  }

  @Get('users')
  @UseGuards(RtGuard)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('user/add')
  @UseGuards(RtGuard, RoleGuard('admin'))
  addUserFromAdmin(@Body() userBody: User): Promise<boolean> {
    return this.userService.addUser(userBody);
  }

  @Delete('user/:userId')
  @UseGuards(RtGuard, RoleGuard('admin'))
  deleteUser(@Param('userId') userId: string): void {
    this.userService.deleteUser(userId.toString());
  }

  @Get('getmyprofile')
  @UseGuards(RtGuard)
  getMyProfile(@Req() request): Promise<any> {
    return this.userService.getMyProfile(request.user.sub);
  }

  // passwordBody: {
  //    password: string
  //  }
  @Patch('user/password')
  @UseGuards(RtGuard)
  changePassword(@Body() passwordBody: any, @Req() request) {
    this.userService.changePassword(passwordBody.password, request.user.sub);
  }

  @Patch('user/notification')
  @UseGuards(RtGuard)
  changeNotificationStatus(@Req() request) {
    this.userService.changeNotificationStatus(request.user.sub);
  }

  // @Get('user/migration/role')
  // @UseGuards(RtGuard)
  // migrationUserForRole() {
  //   this.userService.migrationUserForRole();
  // }

  @Get('test/rabbitmq')
  @UseGuards(RoleGuard('admin'))
  testRabbitMQ() {
    console.log('started');
    this.userService.testRabbitMQ();
  }

  @Get('furkan')
  @UseGuards(RoleGuard('admin'))
  furkan(@Body() body: any): any {
    return this.userService.furkan(body);
  }

  @Get('leaderboard')
  @UseGuards(RtGuard)
  async leaderboard(@Req() request): Promise<LeaderBoardDTO> {
    return await this.userService.leaderboard(request.user.sub);
  }

  @Get('myScore')
  @UseGuards(RtGuard)
  async myScore(@Req() request): Promise<MyScore> {
    return await this.userService.myScore(request.user.sub);
  }

  @Get('myStats')
  @UseGuards(RtGuard)
  async myStats(@Req() request): Promise<UserHistory[]> {
    return await this.userService.getMyStats(request.user.sub);
  }
}
