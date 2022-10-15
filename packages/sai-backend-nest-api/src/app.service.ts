import { Injectable } from '@nestjs/common';
import { PrivacyPolicy } from './models/privacy-policy';
import { SaiApp } from './models/sai-app';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  public checkServer(): string {
    return 'SAI App Working...';
  }

  public async createApp(saiApp: SaiApp) {
    return await this.prisma.app.create({
      data: saiApp,
    });
  }

  public async editPrivacyPolicy(privacyPolicy: PrivacyPolicy) {
    const app: SaiApp = await this.getSaiApp();
    let existsPrivacyPolicy = await this.prisma.privacyPolicy.findFirst({
      where: { app_id: app.id },
    });

    if (!existsPrivacyPolicy) {
      // create privacy policy
      const app: SaiApp = await this.getSaiApp();
      this.prisma.privacyPolicy.create({
        data: {
          content: privacyPolicy.content,
          app_id: app.id,
        },
      });
    } else {
      // update privacy policy
      const app: SaiApp = await this.getSaiApp();
      await this.prisma.privacyPolicy.update({
        where: { app_id: app.id },
        data: {
          content: privacyPolicy.content,
        },
      });
    }
  }

  public async getSaiApp(): Promise<SaiApp> {
    return await this.prisma.app.findFirst({
      where: { isActivity: true },
      include: { privacyPolicy: true },
    });
  }

  public async getPrivacyPolicy(): Promise<PrivacyPolicy> {
    const app: SaiApp = await this.getSaiApp();
    return await this.prisma.privacyPolicy.findFirst({
      where: { app_id: app.id },
    });
  }

  public async getLogs(): Promise<any> {
    return await this.prisma.appLog.findMany();
  }
}
