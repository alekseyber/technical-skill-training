import { Body, Controller, Get, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/schemas/user.schema';
import { PublicSettingsResponse, SettingsDto } from './dto/settingsDto';
import { SettingsService } from './settings.service';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @ApiBearerAuth(UserRole.ADMIN)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Настройки сервиса' })
  @ApiResponse({
    status: 200,
    description: 'Настройки',
    type: SettingsDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get()
  async getSettingsDocument() {
    return this.settingsService.getSettingsData();
  }

  @ApiBearerAuth(UserRole.ADMIN)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Редактировать настройки сервиса' })
  @ApiResponse({
    status: 200,
    description: 'Настройки отредактированы',
    type: SettingsDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Put()
  async updateSettingsDocument(@Body() settingsDto: SettingsDto) {
    return this.settingsService.updateSettingsDocument(settingsDto);
  }

  @Public()
  @ApiOperation({ summary: 'Публичные настройки сервиса' })
  @ApiResponse({
    status: 200,
    description: 'Публичные настройки',
    type: PublicSettingsResponse,
  })
  @Get('public')
  async getPublicSettingsData() {
    return this.settingsService.getPublicSettingsData();
  }
}
