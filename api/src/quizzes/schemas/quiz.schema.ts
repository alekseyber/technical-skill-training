import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { CatalogChild } from 'src/catalog/schemas/catalogChild.schema';
import { trimStartSetter } from 'src/utils/mongooseTrimStartSetter';
import {
  QuizQuestion,
  QuizQuestionDocument,
  QuizQuestionSchema,
} from './quizQuestion.schema';

export type QuizDocument = Quiz & Document;

@Schema({ timestamps: true })
export class Quiz {
  @ApiProperty()
  @Prop({
    required: [true, 'Название обязательное поле'],
    type: String,
    trimStart: true,
    set: trimStartSetter,
  })
  title: string;

  @ApiProperty()
  @Prop({ default: 0, min: 0 })
  timer: number;

  @ApiProperty()
  @Prop({ default: false })
  status: boolean;

  @ApiProperty({ type: String })
  @Prop({ type: Types.ObjectId, ref: 'CatalogChild' })
  categoryId: CatalogChild;

  @ApiProperty()
  @Prop({ default: 1, min: 1 })
  numberOfQuestions: number;

  @ApiProperty()
  @Prop({ default: 1, min: 1 })
  correcToPass: number;

  @ApiProperty({ type: [QuizQuestion] })
  @Prop({ type: [QuizQuestionSchema], default: [] })
  questions: Types.DocumentArray<QuizQuestionDocument>;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

export class QuizResponse extends Quiz {
  @ApiProperty()
  _id: string;
}
