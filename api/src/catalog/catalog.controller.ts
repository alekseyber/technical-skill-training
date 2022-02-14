import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { BaseMongoDto } from 'src/dto/baseMongoDto';
import { UserRole } from 'src/users/schemas/user.schema';
import { CatalogService } from './catalog.service';
import {
  CreateCatalogChildDto,
  UpdateCatalogChildDto,
} from './dto/catalogChildDto';
import { CreateCatalogDto, UpdateCatalogDto } from './dto/catalogDto';
import { CatalogResponse } from './schemas/catalog.schema';

@ApiTags('catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  @ApiBearerAuth(UserRole.USER)
  @ApiOperation({
    summary: 'Получить каталог',
  })
  @ApiResponse({
    status: 200,
    description:
      'Каталог (если пользователь не администратратор, то скрытые каталоги, разделы и тесты переданы не будут.)',
    type: CatalogResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get()
  async getAll() {
    return this.catalogService.findAll();
  }

  @ApiBearerAuth(UserRole.ADMIN)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - создать каталог',
  })
  @ApiResponse({
    status: 201,
    description: 'Каталог создан',
    type: UpdateCatalogDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async createCatalog(@Body() createCatalogDto: CreateCatalogDto) {
    return this.catalogService.create(createCatalogDto);
  }

  @ApiBearerAuth(UserRole.ADMIN)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - обновить каталог',
  })
  @ApiResponse({
    status: 200,
    description: 'Каталог обновлен, вернет только переданные поля',
    type: UpdateCatalogDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Patch()
  async updateCatalogPatch(@Body() updateCatalogDto: UpdateCatalogDto) {
    return this.catalogService.update(updateCatalogDto);
  }

  @ApiBearerAuth(UserRole.ADMIN)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - удалить каталог',
  })
  @ApiResponse({
    status: 200,
    description: 'Будет удален если нет дочерних разделов',
    type: BaseMongoDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete()
  async deleteCatalog(@Query('_id') _id: string) {
    return this.catalogService.deleteById(_id);
  }

  @ApiBearerAuth(UserRole.ADMIN)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - создать раздел каталога',
  })
  @ApiResponse({
    status: 201,
    description: 'Раздел создан, вернет только переданные поля',
    type: UpdateCatalogChildDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('child')
  async createCatalogChild(
    @Body() createCatalogChildDto: CreateCatalogChildDto
  ) {
    return this.catalogService.createChild(createCatalogChildDto);
  }

  @ApiBearerAuth(UserRole.ADMIN)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - обновить раздел каталога',
  })
  @ApiResponse({
    status: 200,
    description: 'Раздел обновлен, вернет только переданные поля',
    type: UpdateCatalogChildDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Patch('child')
  async updateCatalogChildPatch(
    @Body() updateCatalogChildDto: UpdateCatalogChildDto
  ) {
    return this.catalogService.updateChild(updateCatalogChildDto);
  }

  @ApiBearerAuth(UserRole.ADMIN)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - удалить раздел',
  })
  @ApiResponse({
    status: 200,
    description: 'Будет удален если нет дочерних тестов',
    type: BaseMongoDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete('child')
  async deleteChild(@Query('_id') _id: string) {
    return this.catalogService.deleteChild(_id);
  }
}
