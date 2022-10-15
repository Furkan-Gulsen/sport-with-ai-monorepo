import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let spyService: UserService;
  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        furkan: jest
          .fn()
          .mockImplementation((dto) => ({ id: Date.now(), ...dto })),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ApiServiceProvider],
      controllers: [UserController],
    }).compile();
    controller = module.get<UserController>(UserController);
    spyService = module.get<UserService>(UserService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('check furkan test method', async () => {
    const body = { name: 'furkan' };
    expect(controller.furkan(body)).toEqual({
      id: expect.any(Number),
      name: body.name,
    });
    expect(spyService.furkan).toHaveBeenCalledWith(body);
  });
});
