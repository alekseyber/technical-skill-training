import { UserRole } from '../schemas/user.schema';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  surname?: string;
}

export class CreateUserAdminDto extends CreateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  status?: boolean;

  @ApiProperty({
    required: false,
    default: UserRole.USER,
    enum: UserRole,
  })
  @IsOptional()
  userRole?: UserRole;
}
