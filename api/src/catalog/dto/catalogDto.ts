import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class CreateCatalogDto {
  @ApiProperty({
    description: 'Название нового каталога',
  })
  @IsNotEmpty()
  title: string;
}

export class UpdateCatalogDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @ApiProperty({
    required: false,
    description: 'Название каталога',
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
