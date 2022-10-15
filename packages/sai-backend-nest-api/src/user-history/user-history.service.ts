import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Activity,
  ActivityDay,
  PersonalInformation,
  User,
  UserActivity,
  UserHistory,
} from '../models';

@Injectable()
export class UserHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  public errorMessage() {
    return new HttpException(
      'There is a problem. Please try to login again later.',
      HttpStatus.NOT_FOUND,
    );
  }

  private mergeDedupe(arr: any) {
    return [...[].concat(...arr)];
  }

  public async createUserHistory(userId: string) {
    const today: any = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let activityCalorie = 0;

    try {
      const userActivities: UserActivity[] =
        await this.prisma.userActivity.findMany({
          where: {
            creationDate: {
              lte: today,
              gte: yesterday,
            },
          },
        });

      const activityDayIDs: string[] = userActivities.map(
        (userActivity: UserActivity) => userActivity.activityDayId,
      );

      const activityDays: ActivityDay[] =
        await this.prisma.activityDay.findMany({
          where: { id: { in: activityDayIDs } },
        });

      const activitieIDs: string[] = this.mergeDedupe(
        activityDays.map((activityDay: ActivityDay) => activityDay.activiteIDs),
      );

      const activities: any[] = [];
      for (let i = 0; i < activitieIDs.length; i++) {
        const activity: any = await this.prisma.activity.findMany({
          where: { id: activitieIDs[i] },
          select: { id: true, calorie: true },
        });
        activities.push(activity);
      }

      this.mergeDedupe(activities).forEach((activity: Activity) => {
        if (activity.calorie) {
          activityCalorie += activity.calorie;
        }
      });

      await this.prisma.userHistory.create({
        data: {
          userId: userId,
          activityCalorie: activityCalorie,
        },
      });
    } catch (error) {
      console.log('error: ', error);
      await this.prisma.userHistory.create({
        data: {
          userId: userId,
          activityCalorie: 0,
        },
      });
    }

    return activityCalorie;
  }

  public async getUserHistory(
    userId: string,
  ): Promise<UserHistory[] | HttpException> {
    const userHistory: UserHistory[] = await this.prisma.userHistory.findMany({
      where: { userId: userId },
    });
    if (userHistory) {
      return userHistory;
    } else {
      return this.errorMessage();
    }
  }
}
