import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from 'src/auth/roles.decorator';
import { UserItem } from 'src/auth/useritem.decorator';
import { BaseMongoDto } from 'src/dto/baseMongoDto';
import { CreateUserAdminDto } from './dto/createUserDto';
import { UpdateUserAdminDto, UpdateUserDto } from './dto/updateUserDto';
import {
  UserDocumentByAdminResponse,
  UserDocumentByUserResponse,
  UserRole,
} from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth(UserRole.ADMIN)
  @ApiOperation({ summary: 'Администратор - список пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Список пользователей',
    type: [UserDocumentByAdminResponse],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Roles(UserRole.ADMIN)
  @Get()
  async getUsersAdmin() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth(UserRole.ADMIN)
  @ApiOperation({ summary: 'Администратор - создать пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь создан',
    type: UserDocumentByAdminResponse,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Roles(UserRole.ADMIN)
  @Post('admin')
  async createUserAdmin(@Body() createUserDto: CreateUserAdminDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth(UserRole.ADMIN)
  @ApiOperation({ summary: 'Администратор - получить пользователя по _id' })
  @ApiResponse({
    status: 200,
    description: 'Пользователи',
    type: UserDocumentByAdminResponse,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Roles(UserRole.ADMIN)
  @Get('admin')
  async getUserAdmin(@Query('_id') _id: string) {
    return this.usersService.findById(_id);
  }

  @ApiOperation({ summary: 'Администратор - удалить пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь удален',
    type: BaseMongoDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBearerAuth(UserRole.ADMIN)
  @Roles(UserRole.ADMIN)
  @Delete('admin')
  async deleteUserAdmin(@Query('_id') _id: string) {
    return this.usersService.deleteById(_id);
  }

  @ApiBearerAuth(UserRole.ADMIN)
  @ApiOperation({ summary: 'Администратор - редактировать пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь обновлен',
    type: UserDocumentByAdminResponse,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Roles(UserRole.ADMIN)
  @Put('admin')
  async uadateUserAdmin(@Body() updateUserDto: UpdateUserAdminDto) {
    return this.usersService.update(updateUserDto);
  }

  @ApiBearerAuth(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - редактировать отдельное поле пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь обновлен',
    type: UserDocumentByAdminResponse,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Roles(UserRole.ADMIN)
  @Patch('admin')
  async uadateUserAdminPatch(@Body() updateUserDto: UpdateUserAdminDto) {
    return this.usersService.update(updateUserDto);
  }

  @ApiBearerAuth(UserRole.USER)
  @ApiOperation({ summary: 'Пользователь - редактировать СВОЙ профиль' })
  @ApiResponse({
    status: 200,
    description: 'Профиль обновлен',
    type: UserDocumentByUserResponse,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UserItem()
  @Put('user')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @ApiBearerAuth(UserRole.USER)
  @ApiBearerAuth(UserRole.USER)
  @ApiOperation({ summary: 'Пользователь - получить СВОЙ профиль' })
  @ApiResponse({
    status: 200,
    description: 'Профиль',
    type: UserDocumentByUserResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('user')
  async getUserByToken() {
    return this.usersService.findUserByJWT();
  }
}
