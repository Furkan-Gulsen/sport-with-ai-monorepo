import { Test, TestingModule } from '@nestjs/testing';
import { UserHistoryController } from './user-history.controller';
import { UserHistoryService } from './user-history.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UserHistory', () => {
  // let controller: UserHistoryController;
  let service: UserHistoryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHistoryService, PrismaService],
      controllers: [UserHistoryController],
    }).compile();

    // controller = module.get<UserHistoryController>(UserHistoryController);
    service = module.get<UserHistoryService>(UserHistoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be calorie calculate correct', async () => {
    const today: Date = new Date();
    today.setHours(today.getHours() - 1);

    await prisma.userActivity.createMany({
      data: [
        {
          userId: 'f6f4d0c0-18fe-4912-b0fb-24ad482bced1',
          creationDate: today,
          activityDayId: 'f6b91f38-bf23-496c-a6f2-410f5b50ddb2',
        },
        {
          userId: 'f6f4d0c0-18fe-4912-b0fb-24ad482bced1',
          creationDate: today,
          activityDayId: 'a6d2e344-b3b0-470a-8310-71af5eb7df11',
        },
      ],
    });

    const activityCalorie: number = await service.createUserHistory(
      'f6f4d0c0-18fe-4912-b0fb-24ad482bced1',
    );
    expect(activityCalorie).toEqual(300);
  });
});
