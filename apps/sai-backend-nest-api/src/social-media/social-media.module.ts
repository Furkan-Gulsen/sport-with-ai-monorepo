import { Module } from '@nestjs/common';
import { FileUploadService } from '../utils/file-upload.service';
import { SocialMediaController } from './social-media.controller';
import { SocialMediaService } from './social-media.service';
import { CustomLoggerService } from '../utils/logger.service';

@Module({
  controllers: [SocialMediaController],
  providers: [SocialMediaService, FileUploadService, CustomLoggerService],
})
export class SocialMediaModule {}
