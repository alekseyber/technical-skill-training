import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { trimStartSetter } from 'src/utils/mongooseTrimStartSetter';
import {
  CatalogChildSchema,
  CatalogChildDocument,
  CatalogChild,
} from './catalogChild.schema';

export type CatalogDocument = Catalog & Document;

@Schema({ timestamps: true })
export class Catalog {
  @ApiProperty()
  @Prop({
    required: [true, 'Название обязательное поле'],
    type: String,
    trimStart: true,
    set: trimStartSetter,
  })
  title: string;

  @ApiProperty()
  @Prop({ default: true })
  status: boolean;

  @ApiProperty({ type: [CatalogChild] })
  @Prop({ type: [CatalogChildSchema], default: [] })
  childs: Types.DocumentArray<CatalogChildDocument>;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);

export class CatalogResponse extends Catalog {
  @ApiProperty()
  _id: string;
}
