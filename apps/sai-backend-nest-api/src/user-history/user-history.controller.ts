import { RtGuard } from '../guards';
import {
  Controller,
  Get,
  HttpException,
  Query,
  UseGuards,
  Post,
  Req,
  Body,
} from '@nestjs/common';
import { UserHistory } from '../models';
import { UserHistoryService } from './user-history.service';

@Controller('user-history')
export class UserHistoryController {
  constructor(private readonly userHistoryService: UserHistoryService) {}

  @Get('')
  @UseGuards(RtGuard)
  getUserHistory(
    @Req() request,
    @Query('userId') userId: string,
  ): Promise<UserHistory[] | HttpException> {
    if (userId) {
      return this.userHistoryService.getUserHistory(userId);
    } else {
      return this.userHistoryService.getUserHistory(request.user.sub);
    }
  }

  @Post('')
  @UseGuards(RtGuard)
  createUserHistory(@Req() request, @Query('userId') userId: string) {
    if (userId) {
      return this.userHistoryService.createUserHistory(userId);
    } else {
      return this.userHistoryService.createUserHistory(request.user.sub);
    }
  }
}
