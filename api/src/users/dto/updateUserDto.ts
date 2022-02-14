import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional, IsMongoId } from 'class-validator';
import { UserRole } from '../schemas/user.schema';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  surname?: string;
}

export class UpdateUserAdminDto extends UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  username?: string;

  @ApiProperty({
    required: false,
    default: true,
    description: 'Если выключено - пользователь в сервис войти не сможет',
  })
  @IsOptional()
  status?: boolean;

  @ApiProperty({
    required: false,
    default: UserRole.USER,
    enum: UserRole,
  })
  @IsOptional()
  @IsNotEmpty()
  userRole?: UserRole;
}

export class GetItemUserDto {
  @ApiProperty()
  @IsNotEmpty()
  _id: string;
}
