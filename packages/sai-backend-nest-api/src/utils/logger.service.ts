import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomLoggerService {
  constructor(private readonly prismaService: PrismaService) {}

  public async successLog(message: string): Promise<void> {
    await this.prismaService.appLog.create({
      data: {
        message: message,
        logType: 'success',
      },
    });
  }

  public async errorLog(message: string): Promise<void> {
    await this.prismaService.appLog.create({
      data: {
        message: message,
        logType: 'error',
      },
    });
  }

  public async warnLrog(message: string): Promise<void> {
    await this.prismaService.appLog.create({
      data: {
        message: message,
        logType: 'warning',
      },
    });
  }
}
