import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
  Type,
  mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';

const RoleGuard = (role: 'admin' | 'user'): Type<CanActivate> => {
  class RoleGuard implements CanActivate {
    constructor(
      @Inject(forwardRef(() => PrismaService))
      private prismaService: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = await this.prismaService.user.findUnique({
        where: { id: request.user.sub },
        select: {
          id: true,
          role: true,
        },
      });
      if (user.role == role) return true;
      else return false;
    }
  }

  return mixin(RoleGuard);
};

export default RoleGuard;
