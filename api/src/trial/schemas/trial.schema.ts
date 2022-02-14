import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrialDocument = Trial & Document;

@Schema({ timestamps: true, autoIndex: true })
export class Trial {
  @Prop()
  userId: string;

  @Prop()
  quizId: string;

  @Prop()
  questionsIds: string[];

  @Prop({ type: Date, expires: 3600 * 24, default: Date.now })
  createdAt: string;
}

export const TrialSchema = SchemaFactory.createForClass(Trial);
