import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { trimStartSetter } from 'src/utils/mongooseTrimStartSetter';
import {
  QuizAnswer,
  QuizAnswerDocument,
  QuizAnswerSchema,
} from './quizAnswer.schema';

export type QuizQuestionDocument = Document & QuizQuestion;

@Schema()
export class QuizQuestion {
  @ApiProperty()
  @Prop({
    required: [true, 'Вопрос обязательное поле'],
    type: String,
    trimStart: true,
    set: trimStartSetter,
  })
  question: string;

  @ApiProperty()
  @Prop({ default: false })
  multiple?: boolean;

  @ApiProperty({ type: [QuizAnswer] })
  @Prop({ type: [QuizAnswerSchema], default: [] })
  answers: Types.DocumentArray<QuizAnswerDocument>;

  _id: string;
}

export const QuizQuestionSchema = SchemaFactory.createForClass(QuizQuestion);
