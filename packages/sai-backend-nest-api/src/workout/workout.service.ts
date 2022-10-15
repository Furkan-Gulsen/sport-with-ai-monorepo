import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Workout, UserActivity, Activity, ActivityDay } from '../models';
import { PrismaService } from '../prisma/prisma.service';
import { FileUploadService } from '../utils/file-upload.service';

@Injectable()
export class WorkoutService {
  constructor(
    private prisma: PrismaService,
    private fileUploadService: FileUploadService,
  ) {}

  // ------------------- Workout -------------------
  public async getWorkouts(userId: string): Promise<any> {
    const workouts: any[] = await this.prisma.workout.findMany({
      include: {
        activityDays: {
          orderBy: { day: 'asc' },
          include: {
            userActivities: {
              where: {
                userId: userId,
              },
            },
          },
        },
      },
    });
    for (let k = 0; k < workouts.length; k++) {
      for (let j = 0; j < workouts[k].activityDays.length; j++) {
        workouts[k].activityDays[j].activities = [];
        if (workouts[k].activityDays[j].activiteIDs.length > 0) {
          for (
            let i = 0;
            i < workouts[k].activityDays[j].activiteIDs.length;
            i++
          ) {
            let activity = await this.prisma.activity.findUnique({
              where: { id: workouts[k].activityDays[j].activiteIDs[i] },
            });
            workouts[k].activityDays[j].activities.push(activity);
          }
        }
      }
    }
    return workouts;
  }

  public async getWorkout(workoutId: string, userId: string): Promise<Workout> {
    const workout: any = await this.prisma.workout.findUnique({
      where: { id: workoutId },
      include: {
        activityDays: {
          orderBy: { day: 'asc' },
          include: {
            userActivities: {
              where: {
                userId: userId,
              },
            },
          },
        },
      },
    });
    for (let j = 0; j < workout.activityDays.length; j++) {
      workout.activityDays[j].activities = [];
      if (workout.activityDays[j].activiteIDs.length > 0) {
        for (let i = 0; i < workout.activityDays[j].activiteIDs.length; i++) {
          let activity = await this.prisma.activity.findUnique({
            where: { id: workout.activityDays[j].activiteIDs[i] },
          });
          workout.activityDays[j].activities.push(activity);
        }
      }
    }
    return workout;
  }

  public async createWorkout(workout: Workout): Promise<HttpException> {
    if (workout.name && workout.information && workout.kind) {
      await this.prisma.workout.create({ data: workout });
      throw new HttpException('Workout created successfully.', HttpStatus.OK);
    } else {
      throw new HttpException(
        'There was a problem retrieving the values. Please try again later.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async updateWorkout(
    workoutBody: Workout,
  ): Promise<Workout | HttpException> {
    try {
      return await this.prisma.workout.update({
        where: { id: workoutBody.id },
        data: workoutBody,
        include: { activityDays: true },
      });
    } catch (error) {
      throw new HttpException(
        'Please try again later what you want to do.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async deleteWorkout(workoutId: string): Promise<boolean> {
    this.prisma.workout
      .delete({
        where: { id: workoutId },
        include: {
          activityDays: {
            where: { workoutId: workoutId },
          },
        },
      })
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log('error: ', err);
        return false;
      });
    return false;
  }

  // ------------------- Activity Day -------------------
  public async createActivityDay(
    workoutId: string,
  ): Promise<ActivityDay | HttpException> {
    try {
      const workout: Workout = await this.prisma.workout.findUnique({
        where: {
          id: workoutId,
        },
        include: {
          activityDays: true,
        },
      });
      const activityDayLength: number = workout.activityDays.length;
      return await this.prisma.activityDay.create({
        data: {
          workoutId: workoutId,
          day: activityDayLength + 1,
        },
      });
    } catch (error) {
      console.log('Error: ', error);
      throw new HttpException(
        'Please try again later what you want to do.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async getActivityDay(activityDayId: string): Promise<ActivityDay> {
    return await this.prisma.activityDay.findUnique({
      where: { id: activityDayId },
    });
  }

  public async updateActivityDay(
    activityDayBody: ActivityDay,
  ): Promise<ActivityDay | HttpException> {
    let updatedData: any = {};
    if (activityDayBody.day) {
      updatedData.day = activityDayBody.day;
    }
    if (activityDayBody.workoutId) {
      updatedData.workoutId = activityDayBody.workoutId;
    }
    if (activityDayBody.activiteIDs) {
      updatedData.activiteIDs = activityDayBody.activiteIDs;
    }
    try {
      return await this.prisma.activityDay.update({
        where: { id: activityDayBody.id },
        data: updatedData,
      });
    } catch (error) {
      return new HttpException(
        'Please try again later what you want to do.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async deleteActivityDay(workoutId: string): Promise<HttpException> {
    const workout: Workout = await this.prisma.workout.findUnique({
      where: { id: workoutId },
      include: {
        activityDays: true,
      },
    });
    const daysLength: number = workout.activityDays.length;
    const deletedActivityDay: ActivityDay =
      workout.activityDays[daysLength - 1];
    this.prisma.activityDay
      .delete({
        where: { id: deletedActivityDay.id },
        include: { userActivities: true },
      })
      .then(() => {
        return new HttpException(
          'Activity Day has been successfully deleted.',
          HttpStatus.OK,
        );
      })
      .catch((err) => {
        console.log('ERROR: ', err);
        return new HttpException(
          'The deletion failed. Please try again later.',
          HttpStatus.CONFLICT,
        );
      });
    return new HttpException(
      'The deletion failed. Please try again later.',
      HttpStatus.CONFLICT,
    );
  }

  public async completedActivityDay(
    activityDayId: string,
    userId: string,
  ): Promise<any> {
    const checkCompleted: UserActivity =
      await this.prisma.userActivity.findFirst({
        where: {
          userId: userId,
          activityDayId: activityDayId,
        },
      });

    if (!checkCompleted) {
      await this.prisma.userActivity.create({
        data: {
          activityDayId: activityDayId,
          userId: userId,
        },
      });
    } else {
      console.log('Such data already exists.');
    }
  }

  // ------------------- Activity -------------------
  public async createActivity(activity: Activity): Promise<Activity> {
    return await this.prisma.activity.create({ data: activity });
  }

  public async getActivity(activityId: string): Promise<Activity> {
    return await this.prisma.activity.findUnique({ where: { id: activityId } });
  }

  public async getAllActivities(): Promise<Activity[]> {
    return await this.prisma.activity.findMany();
  }

  public async updateActivity(
    activityBody: Activity,
  ): Promise<Activity | HttpException> {
    try {
      return await this.prisma.activity.update({
        where: { id: activityBody.id },
        data: activityBody,
      });
    } catch (error) {
      return new HttpException(
        'Please try again later what you want to do.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async deleteActivity(activityId: string): Promise<boolean> {
    const activityDays: ActivityDay[] = await this.prisma.activityDay.findMany({
      where: { activiteIDs: { has: activityId } },
    });
    activityDays.forEach(async (activityDay: ActivityDay) => {
      let newActiviteIDs: string[] = activityDay.activiteIDs;
      let index = newActiviteIDs.findIndex((aId) => aId == activityId);
      newActiviteIDs.splice(index, 1);
      await this.prisma.activityDay.update({
        where: { id: activityDay.id },
        data: { activiteIDs: newActiviteIDs },
      });
    });
    this.prisma.activity
      .delete({ where: { id: activityId } })
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log('error: ', err);
        return false;
      });
    return false;
  }

  public async uploadImage(folderName: string, file: File) {
    try {
      const res: any = await this.fileUploadService.upload(file, folderName);
      return { location: res.Location };
    } catch (error) {
      console.error('error: ', error);
      throw new HttpException(
        'Your workout could not be created due to a problem. Please try again later.',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }

  public async addActivityInActivityDay(
    activityDayId: string,
    activityId: string,
  ): Promise<any> {
    try {
      const activityDay: ActivityDay = await this.prisma.activityDay.findUnique(
        {
          where: { id: activityDayId },
        },
      );
      let newActiviteIDs = activityDay.activiteIDs;
      newActiviteIDs.push(activityId);
      return await this.prisma.activityDay.update({
        where: { id: activityDayId },
        data: {
          activiteIDs: newActiviteIDs,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Please try again later what you want to do.',
        HttpStatus.CONFLICT,
      );
    }
  }

  public async removeActivityInActivityDay(
    activityDayId: string,
    activityId: string,
  ): Promise<any> {
    try {
      const activityDay: ActivityDay = await this.prisma.activityDay.findUnique(
        {
          where: { id: activityDayId },
        },
      );
      let newActiviteIDs = activityDay.activiteIDs;
      const index: number = newActiviteIDs.indexOf(activityId);
      if (index >= 0) {
        newActiviteIDs.splice(index, 1);
      }
      await this.prisma.activityDay.update({
        where: { id: activityDayId },
        data: {
          activiteIDs: newActiviteIDs,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Please try again later what you want to do.',
        HttpStatus.CONFLICT,
      );
    }
  }

  // ------------------- User Activity -------------------
  public async createUserActivity(
    userActivity: UserActivity,
  ): Promise<UserActivity> {
    return await this.prisma.userActivity.create({ data: userActivity });
  }

  public async getUserActivity(userActivityId: string): Promise<UserActivity> {
    return await this.prisma.userActivity.findUnique({
      where: { id: userActivityId },
    });
  }

  public async updateUserActivity(
    userActivityBody: UserActivity,
  ): Promise<UserActivity | HttpException> {
    try {
      return await this.prisma.userActivity.update({
        where: { id: userActivityBody.id },
        data: userActivityBody,
      });
    } catch (error) {
      return new HttpException(
        'Please try again later what you want to do.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async deleteUserActivity(userActivityId: string): Promise<boolean> {
    this.prisma.userActivity
      .delete({ where: { id: userActivityId } })
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log('error: ', err);
        return false;
      });
    return false;
  }
}
