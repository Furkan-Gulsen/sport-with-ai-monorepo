import { Module } from '@nestjs/common';
import { FileUploadService } from '../utils/file-upload.service';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';

@Module({
  controllers: [WorkoutController],
  providers: [WorkoutService, FileUploadService],
})
export class WorkoutModule {}
