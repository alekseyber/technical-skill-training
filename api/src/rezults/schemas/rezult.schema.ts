import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import {
  RezultQuestion,
  RezultQuestionDocument,
  RezultQuestionSchema,
} from './rezultQuestion.schema';

export type RezultDocument = Rezult & Document;

@Schema({ timestamps: true })
export class Rezult {
  @ApiProperty()
  @Prop({
    required: true,
  })
  userId: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  quizId: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  title: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  rezultTest: boolean;

  @ApiProperty()
  @Prop({
    required: true,
  })
  rezultTime: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  numberOfQuestions: number;

  @ApiProperty()
  @Prop({
    required: true,
  })
  numberOfСorrectQuestions: number;

  @ApiProperty({ type: [RezultQuestion] })
  @Prop({ type: [RezultQuestionSchema], default: [] })
  failedDetails: Types.DocumentArray<RezultQuestionDocument>;

  @ApiProperty({ type: [String] })
  @Prop({ type: [String], default: [] })
  successfully: string[];

  @ApiProperty({ type: [String] })
  @Prop({ type: [String], default: [] })
  failed: string[];
}

export const RezultSchema = SchemaFactory.createForClass(Rezult);

export class RezultResponse extends Rezult {
  @ApiProperty()
  _id: string;
}
