import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class CreateCatalogChildDto {
  @ApiProperty({
    description: 'Название раздела',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: '_id родительского каталога',
  })
  @IsNotEmpty()
  @IsMongoId()
  parentId: string;
}

export class UpdateCatalogChildDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @ApiProperty({
    required: false,
    description: 'Название раздела',
  })
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({
    required: false,
    default: true,
    description: 'Включен/выключен',
  })
  @IsOptional()
  status?: boolean;
}
