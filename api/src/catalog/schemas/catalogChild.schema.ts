import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { ItemChildQuizzesForCatalog } from 'src/quizzes/dto/quizDto';
import { trimStartSetter } from 'src/utils/mongooseTrimStartSetter';

export type CatalogChildDocument = Document & CatalogChild;

@Schema({
  toJSON: {
    getters: true,
  },
})
export class CatalogChild {
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
  status?: boolean;

  @ApiProperty({ type: [ItemChildQuizzesForCatalog] })
  @Prop({
    get: function () {
      return [];
    },
  })
  childs: ItemChildQuizzesForCatalog[] | [];

  @ApiProperty()
  _id: string;
}

export const CatalogChildSchema = SchemaFactory.createForClass(CatalogChild);
