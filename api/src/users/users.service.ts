import { Injectable, NotFoundException, Inject, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoDto } from 'src/dto/baseMongoDto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateUserAdminDto, CreateUserDto } from './dto/createUserDto';
import { UpdateUserAdminDto, UpdateUserDto } from './dto/updateUserDto';
import {
  User,
  userAdminProjection,
  UserDocument,
  UserDocumentByAdminResponse,
  UserDocumentByUserResponse,
  userProjection,
  UserRole,
} from './schemas/user.schema';
import { passwordSetHash } from 'src/utils/passwordSetHash';
import { ResetPasswordDto } from 'src/auth/dto/resetPasswordDto';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @Inject(REQUEST)
    private request: Request
  ) {}

  async create(
    createUserDto: CreateUserDto | CreateUserAdminDto
  ): Promise<UserDocument> {
    createUserDto.password = passwordSetHash(createUserDto.password);

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async createStartValidate(): Promise<boolean> {
    const count = await this.userModel.count({
      status: true,
      userRole: UserRole.ADMIN,
    });

    return count === 0;
  }

  async isActiveUserById(_id: string): Promise<boolean> {
    const count = await this.userModel.count({
      status: true,
      _id,
    });

    return count > 0;
  }

  async update(
    updateUserDto: UpdateUserDto | UpdateUserAdminDto
  ): Promise<UserDocument> {
    const { _id, ...data } = updateUserDto;
    if (data?.password) {
      data.password = passwordSetHash(data.password);
    }
    const doc = await this.userModel.findOneAndUpdate({ _id }, data, {
      fields: userAdminProjection,
    });
    if (!doc) throw new NotFoundException('Пользователь не найден');

    return doc;
  }

  async deleteById(_id: string): Promise<BaseMongoDto> {
    const res = await this.userModel.deleteOne({ _id });

    if (res.deletedCount === 0)
      throw new NotFoundException('Пользователь не найден');
    return { _id };
  }

  async findById(_id: string): Promise<UserDocument> {
    const doc = await this.userModel.findById(_id, userAdminProjection).exec();
    if (!doc) throw new NotFoundException('Пользователь не найден');
    return doc;
  }

  isAdmin(): boolean {
    const { userRole } = { userRole: '', ...this.request?.user };
    return userRole === UserRole.ADMIN;
  }

  getСurrentUserId(): string {
    const { _id } = { _id: '', ...this.request?.user };
    if (!_id) throw new NotFoundException('Пользователь не найден');
    return _id;
  }

  async findUserByJWT(): Promise<UserDocumentByUserResponse | null> {
    const _id = this.getСurrentUserId();

    const doc = await this.userModel.findById(_id, userProjection).exec();
    if (!doc) throw new NotFoundException('Пользователь не найден');
    return doc;
  }

  async findAll(): Promise<UserDocumentByAdminResponse[]> {
    return this.userModel.find({}, userAdminProjection).exec();
  }

  async findOneLogin(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username, status: true }).exec();
  }

  async getUserByEmail(
    resetPasswordDto: ResetPasswordDto
  ): Promise<UserDocument | null> {
    const { email } = resetPasswordDto;
    return this.userModel.findOne({ email, status: true }).exec();
  }
}
