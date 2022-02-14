import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type RezultAnswerDocument = Document & RezultAnswer;

@Schema()
export class RezultAnswer {
  @ApiProperty()
  @Prop()
  answer: string;

  @ApiProperty()
  _id: string;
}

export const RezultAnswerSchema = SchemaFactory.createForClass(RezultAnswer);
