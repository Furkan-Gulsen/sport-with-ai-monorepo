import { Module } from '@nestjs/common';
import { CronService } from '../cron/cron.service';
import { CustomLoggerService } from '../utils/logger.service';
import { UserHistoryController } from './user-history.controller';
import { UserHistoryService } from './user-history.service';

@Module({
  controllers: [UserHistoryController],
  providers: [UserHistoryService, CustomLoggerService, CronService],
})
export class UserHistoryModule {}
