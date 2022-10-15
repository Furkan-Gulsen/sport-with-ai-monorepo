import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomLoggerService } from '../utils/logger.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.register({}),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: '"nest-modules" <sportwithai@gmail.com>',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, CustomLoggerService],
})
export class AuthModule {}
