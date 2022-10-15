import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'sai-backend-api-token',
      ignoreExpiration: true,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const token = req.get('authorization').replace('Bearer', '').trim();
    // return this.authService.validateUser(token);
    return { ...payload, token };
  }
}
