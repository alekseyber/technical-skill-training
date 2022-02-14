import { BaseDTO, GETBaseDTOUseParams } from '.';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface UserAuth {
  sub: string;
  username: string;
  userRole: UserRole;
  tokenType: string;
}

export interface UserCandidateDTO {
  username: string;
  password: string;
}

export interface PasswordResetDTO {
  email: string;
}

export interface UserBaseDTO extends BaseDTO {
  name: string;
  surname: string;
  email: string;
  password?: string;
  status?: boolean;
  userRole?: UserRole;
}

export interface UserNewDTO extends Omit<UserBaseDTO, '_id'> {
  username: string;
  password: string;
  _id?: string;
}

export interface UserNewAdminDTO extends UserNewDTO {
  userRole: UserRole;
  status: boolean;
}

export interface UserAdminDTO extends UserBaseDTO {
  userRole: UserRole;
  status: boolean;
  username: string;
  password?: string;
}

export interface UserAdminListItemDTO {
  _id: string;
  username: string;
  name: string;
  surname: string;
  userRole: UserRole;
  status: boolean;
}

export type UserAdminListDTO = UserAdminListItemDTO[];

export type GetUserAdminDTO = GETBaseDTOUseParams<'_id'>;
