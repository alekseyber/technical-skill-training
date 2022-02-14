import { ApiProperty } from '@nestjs/swagger';

export class BaseMongoDto {
  @ApiProperty()
  _id: string;
}
