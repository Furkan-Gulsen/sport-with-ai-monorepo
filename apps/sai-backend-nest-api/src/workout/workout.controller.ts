import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Activity, ActivityDay, UserActivity, Workout } from '../models';
import { RtGuard } from '../guards';
import { WorkoutService } from './workout.service';
import { FileInterceptor } from '@nestjs/platform-express';
import RoleGuard from '../guards/role.guard';

@Controller()
export class WorkoutController {
  constructor(private workoutService: WorkoutService) {}

  // ------------------- Workout -------------------
  @Get('workouts')
  @UseGuards(RtGuard)
  getWorkouts(@Req() request): Promise<any | HttpException> {
    return this.workoutService.getWorkouts(request.user.sub);
  }

  @Get('workout/:id')
  @UseGuards(RtGuard)
  getWorkout(
    @Req() request,
    @Param('id') id: string,
  ): Promise<Workout | HttpException> {
    return this.workoutService.getWorkout(id, request.user.sub);
  }

  @Post('workout/upload/image')
  @UseGuards(RtGuard, RoleGuard('admin'))
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile('file') file) {
    return this.workoutService.uploadImage('workoutCoverImage', file);
  }

  @Post('workout')
  @UseGuards(RtGuard, RoleGuard('admin'))
  createUserPersonalInformation(
    @Body() workoutBody: Workout,
  ): Promise<Workout | HttpException> {
    return this.workoutService.createWorkout(workoutBody);
  }

  @Patch('workout')
  @UseGuards(RtGuard, RoleGuard('admin'))
  updateWorkout(
    @Body() workoutBody: Workout,
  ): Promise<Workout | HttpException> {
    return this.workoutService.updateWorkout(workoutBody);
  }

  @Delete('workout/:id')
  @UseGuards(RtGuard, RoleGuard('admin'))
  deleteWorkout(@Param('id') id: string): Promise<boolean> {
    return this.workoutService.deleteWorkout(id);
  }

  // ------------------- Activity Day -------------------
  @Get('activity-day/:id')
  @UseGuards(RtGuard)
  getActivityDay(
    @Param('id') id: string,
  ): Promise<ActivityDay | HttpException> {
    return this.workoutService.getActivityDay(id);
  }

  @Post('activity-day')
  @UseGuards(RtGuard, RoleGuard('admin'))
  createActivityDay(
    @Query('workoutId') workoutId: string,
  ): Promise<ActivityDay | HttpException> {
    return this.workoutService.createActivityDay(workoutId);
  }

  @Patch('activity-day')
  @UseGuards(RtGuard, RoleGuard('admin'))
  updateActivityDay(
    @Body() activityDayBody: ActivityDay,
  ): Promise<ActivityDay | HttpException> {
    return this.workoutService.updateActivityDay(activityDayBody);
  }

  @Delete('activity-day')
  @UseGuards(RtGuard, RoleGuard('admin'))
  deleteActivityDay(
    @Query('workoutId') workoutId: string,
  ): Promise<HttpException> {
    return this.workoutService.deleteActivityDay(workoutId);
  }

  @Patch('activity-day/add-activity')
  @UseGuards(RtGuard, RoleGuard('admin'))
  addActivityInActivityDay(
    @Query('activityDayId') activityDayId: string,
    @Query('activityId') activityId: string,
  ): Promise<Activity | HttpException> {
    return this.workoutService.addActivityInActivityDay(
      activityDayId,
      activityId,
    );
  }

  @Patch('activity-day/remove-activity')
  @UseGuards(RtGuard, RoleGuard('admin'))
  removeActivityInActivityDay(
    @Query('activityDayId') activityDayId: string,
    @Query('activityId') activityId: string,
  ): Promise<Activity | HttpException> {
    return this.workoutService.removeActivityInActivityDay(
      activityDayId,
      activityId,
    );
  }

  @Post('activityDay/completed/:activityDayId')
  @UseGuards(RtGuard)
  completeActivity(
    @Req() request,
    @Param('activityDayId') activityDayId: string,
  ): Promise<void> {
    return this.workoutService.completedActivityDay(
      activityDayId,
      request.user.sub,
    );
  }

  // ------------------- Activity -------------------
  @Get('activities')
  @UseGuards(RtGuard)
  getAllActivities(): Promise<Activity[] | HttpException> {
    return this.workoutService.getAllActivities();
  }

  @Get('activity/:id')
  @UseGuards(RtGuard)
  getActivity(@Param('id') id: string): Promise<Activity | HttpException> {
    return this.workoutService.getActivity(id);
  }

  @Post('activity/upload/image')
  @UseGuards(RtGuard, RoleGuard('admin'))
  @UseInterceptors(FileInterceptor('file'))
  uploadImageForActivity(@UploadedFile('file') file) {
    return this.workoutService.uploadImage('activityImages', file);
  }

  @Post('activity')
  @UseGuards(RtGuard, RoleGuard('admin'))
  createActivity(
    @Body() activityBody: Activity,
  ): Promise<Activity | HttpException> {
    return this.workoutService.createActivity(activityBody);
  }

  @Patch('activity')
  @UseGuards(RtGuard, RoleGuard('admin'))
  updateActivity(
    @Body() activityBody: Activity,
  ): Promise<Activity | HttpException> {
    return this.workoutService.updateActivity(activityBody);
  }

  @Delete('activity/:id')
  @UseGuards(RtGuard, RoleGuard('admin'))
  deleteActivity(@Param('id') id: string): Promise<boolean> {
    return this.workoutService.deleteActivity(id);
  }

  // ------------------- User Activity -------------------
  @Get('user-activity/:id')
  @UseGuards(RtGuard)
  getUserActivity(
    @Param('id') id: string,
  ): Promise<UserActivity | HttpException> {
    return this.workoutService.getUserActivity(id);
  }

  @Post('user-activity')
  @UseGuards(RtGuard)
  createUserActivity(
    @Body() userActivityBody: UserActivity,
  ): Promise<UserActivity | HttpException> {
    return this.workoutService.createUserActivity(userActivityBody);
  }

  // @Patch('user-activity')
  // @UseGuards(RtGuard)
  // updateUserActivity(
  //   @Body() userActivityBody: UserActivity,
  // ): Promise<UserActivity | HttpException> {
  //   return this.workoutService.updateUserActivity(userActivityBody);
  // }

  @Delete('user-activity/:id')
  @UseGuards(RtGuard, RoleGuard('admin'))
  deleteUserActivity(@Param('id') id: string): Promise<boolean> {
    return this.workoutService.deleteUserActivity(id);
  }
}
