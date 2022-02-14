import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LeanDocument } from 'mongoose';
import { SettingsDocument } from '../schemas/settings.schema';

export class SettingsDto {
  @ApiProperty({
    required: false,
    description: 'Если не задать, e-mail от сервиса приходить не будут',
  })
  @IsString()
  smtpHost: string;

  @ApiProperty({
    required: false,
    default: true,
    description: 'Если true - port 465, false - 587',
  })
  @IsBoolean()
  smtpSecure: boolean;

  @ApiProperty({
    required: false,
    description: 'Если не задать, e-mail от сервиса приходить не будут',
  })
  @IsString()
  smtpLogin: string;

  @ApiProperty({
    required: false,
    description: 'Если не задать, e-mail от сервиса приходить не будут',
  })
  @IsString()
  smtpPassword: string;

  @ApiProperty({
    required: false,
    description: 'Название сервиса',
  })
  @IsString()
  serviceName: string;

  @ApiProperty({
    required: false,
    description: 'E-mail отправителя писем от сервиса',
  })
  @IsString()
  fromEmail: string;
}

export type ProtectionRezultDto = Partial<
  Omit<
    LeanDocument<SettingsDocument>,
    '__v' | 'createdAt' | 'updatedAt' | 'current'
  >
>;

export class PublicSettingsResponse {
  @ApiProperty()
  serviceName: string;
}
