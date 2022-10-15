import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { WorkoutModule } from './workout/workout.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { UserHistoryModule } from './user-history/user-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    UserModule,
    SocialMediaModule,
    WorkoutModule,
    UserHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
