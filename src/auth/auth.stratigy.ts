import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { isValidObjectId } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_COOKIE_KEY } from 'src/constants';
import { User } from 'src/user/user.model';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          const data = request?.cookies[AUTH_COOKIE_KEY];
          return data ? data.token : null;
        },
      ]),

      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  validate = async (payload: User) => {
    if (!payload || !isValidObjectId(payload._id))
      throw new UnauthorizedException();
    return payload;
  };
}
