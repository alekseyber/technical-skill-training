import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { BaseMongoDto } from 'src/dto/baseMongoDto';
import { UserRole } from 'src/users/schemas/user.schema';
import {
  ItemTestQuestionsRezultDTO,
  RezultRegistrationDto,
  UserStatisticItemUser,
} from './dto/rezultRegistrationDto';
import { RezultsService } from './rezults.service';
import { RezultResponse } from './schemas/rezult.schema';

@ApiTags('rezults')
@Controller('rezults')
export class RezultsController {
  constructor(private rezultsService: RezultsService) {}

  @ApiBearerAuth(UserRole.USER)
  @ApiOperation({ summary: 'Пользователь - регистрация результатов теста' })
  @ApiResponse({
    status: 201,
    description: 'Зарегистрировно',
    type: ItemTestQuestionsRezultDTO,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post()
  async rezultRegistrationl(
    @Body() rezultRegistrationDto: RezultRegistrationDto
  ) {
    return this.rezultsService.rezultRegistration(rezultRegistrationDto);
  }

  @ApiBearerAuth(UserRole.USER)
  @ApiOperation({
    summary: 'Пользователь - результаты СВОИХ тестов',
  })
  @ApiResponse({
    status: 200,
    description: 'Результаты пользователя',
    type: UserStatisticItemUser,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get()
  async rezultAllForСurrentUserl() {
    return this.rezultsService.findAllAndСurrentUserId();
  }

  @ApiBearerAuth(UserRole.USER)
  @ApiOperation({ summary: 'Пользователь - СВОЙ результат теста по _id' })
  @ApiResponse({
    status: 200,
    description: 'Результат',
    type: RezultResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('item')
  async rezultItemForСurrentUserl(@Query('_id') _id: string) {
    return this.rezultsService.findByIdAndСurrentUserId(_id);
  }

  @ApiBearerAuth(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - результаты тестов по _id пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Результаты пользователя',
    type: UserStatisticItemUser,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Roles(UserRole.ADMIN)
  @Get('admin')
  async findAllByUserId(@Query('_id') _id: string) {
    return this.rezultsService.findAllByUserId(_id);
  }

  @ApiBearerAuth(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - удаление результата теста по _id',
  })
  @ApiResponse({
    status: 200,
    description: 'Удален',
    type: BaseMongoDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Roles(UserRole.ADMIN)
  @Delete('admin/item')
  async deleteCatalog(@Query('_id') _id: string) {
    return this.rezultsService.deleteById(_id);
  }

  @ApiBearerAuth(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - результат по _id',
  })
  @ApiResponse({
    status: 200,
    description: 'Результат',
    type: RezultResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Roles(UserRole.ADMIN)
  @Get('admin/item')
  async findById(@Query('_id') _id: string) {
    return this.rezultsService.findById(_id);
  }
}
