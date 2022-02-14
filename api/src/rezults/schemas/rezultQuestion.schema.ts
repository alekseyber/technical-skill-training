import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import {
  RezultAnswer,
  RezultAnswerDocument,
  RezultAnswerSchema,
} from './rezultAnswer.schema';

export type RezultQuestionDocument = Document & RezultQuestion;

@Schema()
export class RezultQuestion {
  @ApiProperty()
  @Prop()
  question: string;

  @ApiProperty({ type: [RezultAnswer] })
  @Prop({ type: [RezultAnswerSchema], default: [] })
  answers: Types.DocumentArray<RezultAnswerDocument>;

  @ApiProperty()
  _id: string;
}

export const RezultQuestionSchema =
  SchemaFactory.createForClass(RezultQuestion);
