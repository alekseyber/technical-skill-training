import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { trimStartSetter } from 'src/utils/mongooseTrimStartSetter';

export type UserDocument = User & Document;

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: [true, 'Логин обязательное поле'],
    unique: [true, 'Такой логин уже есть в базе'],
    type: String,
    trimStart: true,
    set: trimStartSetter,
  })
  username: string;

  @Prop({
    required: [true, 'Имя обязательное поле'],
    type: String,
    trimStart: true,
    set: trimStartSetter,
  })
  name: string;

  @Prop({ default: '', type: String, trimStart: true, set: trimStartSetter })
  surname: string;

  @Prop({
    type: String,
    validate: {
      validator: function (v: string) {
        return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} не является валидным e-mail!`,
    },
    required: [true, 'E-mail обязательное поле'],
    unique: [true, 'Такой E-mail уже есть в базе'],
    trimStart: true,
    set: trimStartSetter,
  })
  email: string;

  @Prop({ required: true, type: String, trimStart: true, set: trimStartSetter })
  password: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({
    default: UserRole.USER,
    type: String,
    enum: UserRole,
  })
  userRole: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const userProjection = {
  email: true,
  name: true,
  surname: true,
};

export const userAdminProjection = {
  email: true,
  name: true,
  surname: true,
  status: true,
  userRole: true,
  username: true,
};

export class UserDocumentByUserResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;
}

export class UserDocumentByAdminResponse extends UserDocumentByUserResponse {
  @ApiProperty()
  status: boolean;

  @ApiProperty({ enum: UserRole })
  userRole: UserRole;

  @ApiProperty()
  username: string;
}
