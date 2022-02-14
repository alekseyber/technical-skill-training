import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { PayloadTokenDto } from './dto/payloadTokenDto';
import { AuthUserDto } from 'src/auth/dto/authUserDto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: PayloadTokenDto): Promise<AuthUserDto | null> {
    return {
      _id: payload.sub,
      username: payload.username,
      userRole: payload.userRole,
    };
  }
}
