import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

@Schema({ timestamps: true, autoIndex: true })
export class Settings {
  @Prop({ default: '' })
  smtpHost: string;

  @Prop({ default: true })
  smtpSecure: boolean;

  @Prop({ default: '' })
  smtpLogin: string;

  @Prop({ default: '' })
  smtpPassword: string;

  @Prop({ default: '' })
  serviceName: string;

  @Prop({ default: '' })
  fromEmail: string;

  @Prop({ default: false })
  current: boolean;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
