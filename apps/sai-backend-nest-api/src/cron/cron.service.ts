import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserHistoryService } from '../user-history/user-history.service';
import { User } from '../models';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CronService {
  constructor(
    private readonly prisma: PrismaService,
    private userHistoryService: UserHistoryService,
  ) {}

  @Cron('0 0 * * *')
  // @Cron('*/3 * * * * *')
  async handleCron() {
    const allUsers: User[] = await this.prisma.user.findMany();
    for (let i = 0; i < allUsers.length; i++) {
      await this.userHistoryService.createUserHistory(allUsers[i].id);
    }
  }
}
