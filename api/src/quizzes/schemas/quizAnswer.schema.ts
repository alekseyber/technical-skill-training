import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { trimStartSetter } from 'src/utils/mongooseTrimStartSetter';

export type QuizAnswerDocument = Document & QuizAnswer;

@Schema()
export class QuizAnswer {
  @ApiProperty()
  @Prop({
    required: [true, 'Ответ обязательное поле'],
    type: String,
    trimStart: true,
    set: trimStartSetter,
  })
  answer: string;

  @ApiProperty()
  @Prop({ default: false })
  loyal: boolean;

  @ApiProperty()
  @Prop({ default: 0, min: 0 })
  orderValue: number;

  _id: string;
}

export const QuizAnswerSchema = SchemaFactory.createForClass(QuizAnswer);
