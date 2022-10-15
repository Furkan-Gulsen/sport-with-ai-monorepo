import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrivacyPolicy } from './models/privacy-policy';
import { SaiApp } from './models/sai-app';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  checkServer(): string {
    return this.appService.checkServer();
  }

  @Post('app')
  createSaiApp(@Body() saiApp: SaiApp): void {
    this.appService.createApp(saiApp);
  }

  @Patch('privacy-policy')
  createPrivacyPolicy(@Body() privacyPolicy: any): void {
    this.appService.editPrivacyPolicy(privacyPolicy);
  }

  @Get('app')
  async getSaiApp(): Promise<SaiApp> {
    return await this.appService.getSaiApp();
  }

  @Get('privacy-policy')
  async getPrivacyPolicy(): Promise<PrivacyPolicy> {
    return await this.appService.getPrivacyPolicy();
  }

  @Get('logs')
  async getLogs(): Promise<PrivacyPolicy> {
    return await this.appService.getLogs();
  }
}
