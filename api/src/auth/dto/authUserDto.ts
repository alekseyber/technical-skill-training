import { UserRole } from '../../users/schemas/user.schema';

export interface AuthUserDto {
  _id: string;
  username: string;
  userRole: UserRole;
}
