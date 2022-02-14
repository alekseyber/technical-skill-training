import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/users/schemas/user.schema';

export interface PayloadTokenDto {
  username: string;
  userRole: UserRole;
  sub: string;
  tokenType: string;
}

export interface JwtToken {
  access_token: string;
}

export class JwtToken {
  @ApiProperty()
  access_token: string;
}
