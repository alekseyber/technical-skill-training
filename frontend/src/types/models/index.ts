import type { AuthDTO } from './AuthDTO';
import { ItemTestDTO, QuestionDTO, AnswerDTO, GetItemTestDTO } from './ItemTestDTO';
import { AnswerEditDTO, GetItemTestEditDTO, ItemTestEditDTO, QuestionEditDTO } from './ItemTestEditDTO';
import {
  ItemTestQuestionAnswersDTO,
  ItemTestQuestionsDTO,
  ItemTestQuestionsRezultDTO,
} from './ItemTestQuestionDTO';
import { GeRezultTestDTO, RezultTestDTO } from './RezultTestDTO';

import {
  TestsDTO,
  DirectProgrammingDTO,
  DirectProgrammingСhapterDTO,
  DirectProgrammingTestDTO,
} from './TestsDTO';
import type {
  UserAdminDTO,
  UserBaseDTO,
  UserCandidateDTO,
  UserAuth,
  UserNewDTO,
  UserAdminListDTO,
  UserAdminListItemDTO,
  UserNewAdminDTO,
  GetUserAdminDTO,
  PasswordResetDTO,
} from './UserDTO';
import { UserStatisticDTO, UserStatisticRezultDTO, GetUserStatisticAdminDTO } from './UserStatisticDTO';

export enum TypeNameEnum {
  //GET DirectProgrammingDTO | POST, PATCH RequestSaveDTO<DirectProgrammingDTO> -> DirectProgrammingDTO | DELETE BaseDTO
  DIRECT_PROGRAMMING = '/catalog', //!
  //POST, PATCH RequestSaveDTO<DirectProgrammingСhapterDTO> -> DirectProgrammingСhapterDTO | DELETE BaseDTO
  DIRECT_PROGRAMMING_CHARTER = '/catalog/child', //!
  //POST, PATCH PUT RequestSaveDTO<DirectProgrammingTestDTO> -> DirectProgrammingTestDTO | DELETE BaseDTO
  DIRECT_PROGRAMMING_TEST = '/quizzes',
  //GET GetItemTestDTO -> ItemTestDTO
  TEST_ITEM = '/trial', //!
  //POST ItemTestQuestionsDTO -> ItemTestRezultDTO
  TEST_REZULT_ITEM_REGISTRATION = '/rezults', //!
  //GET GeRezultTestDTO -> RezultTestDTO | DELETE BaseDTO only admin
  TEST_REZULT_ITEM = '/rezults/item', //!
  //GET GetItemTestEditDTO -> ItemTestEditDTO, POST, PUT  RequestSaveDTO<ItemTestEditDTO> -> ItemTestEditDTO | DELETE BaseDTO
  ADMIN_TEST_ITEM = '/quizzes', //!
  //POST, PUT RequestSaveDTO<QuestionEditDTO> -> QuestionEditDTO | DELETE BaseDTO
  ADMIN_TEST_ITEM_QUESTION = '/quizzes/question', //!
  //GET UserBaseDTO, POST, PUT RequestSaveDTO<UserBaseDTO> -> UserBaseDTO
  USER_PROFILE = '/users/user', //!
  //GET UserAdminListDTO
  USER_REGISTRATION = '/auth/registration', //!
  //GET UserAdminListDTO
  ADMIN_USERS = '/users', //!
  //GET GetUserAdminDTO -> UserAdminDTO, POST, PUT RequestSaveDTO<UserAdminDTO> -> UserAdminDTO | DELETE BaseDTO (UserAdminListItemDTO)
  ADMIN_USER_ITEM = '/users/admin',
  //GET UserStatisticDTO
  ADMIN_TEST_REZULTS = '/rezults/admin', //!
  //GET GetUserStatisticAdminDTO -> UserStatisticDTO
  ADMIN_USER_ITEM_STATISTICS = '/rezults/admin/item', //!
  //GET UserStatisticDTO
  USER_TEST_REZULTS = '/rezults', //!,
  //POST UserCandidateDTO -> AuthDTO
  LOGIN = '/auth/login', //!
  //POST RequestSaveDTO<UserBaseDTO> ->200 // только если в БД 0 пользовтелей
  START_REGISTRATION = '/auth/start-registration', //!
  //GET PUT
  ADMIN_SETTINGS = '/settings', //!
  //Get
  PUBLIC_SETTINGS = '/settings/public', //!
  //GET GetValidUniqDTO -> GetValidUniqDTO
  VALID_UNIQ = '/valid-uniq.json',
  //POST RequestSaveDTO<PasswordResetDTO> ->200
  PASSWORD_RESET = '/auth/reset-password', //!
}

export enum GetValidUniqKeysEnum {
  EMAIL = 'email',
  LOGIN = 'login',
}

export interface GetValidUniqDTO extends Partial<Record<GetValidUniqKeysEnum, string>> {
  _id: string | undefined;
}

export type ValidUniqRezultDTO = Partial<Record<GetValidUniqKeysEnum, boolean>>;

export interface BaseDTO {
  _id: string;
}

export interface BaseParentIdDTO {
  parentId: string;
}

export type SettingsDTO = Record<string, string | boolean | number> & BaseDTO;

export interface PublicSettingsDTO {
  serviceName: string;
}

// POST, PUT
// export interface RequestSaveDTO<DTO> {
//   _id: string;
//   data: Partial<DTO>;
// }
export type RequestSaveDTO<DTO> = Partial<DTO> & BaseDTO;

export type GETBaseDTOUseParams<K extends string = '_id'> = Record<K, string | undefined>;

export type {
  AuthDTO,
  UserAuth,
  UserCandidateDTO,
  TestsDTO,
  DirectProgrammingDTO,
  DirectProgrammingСhapterDTO,
  ItemTestDTO,
  QuestionDTO,
  AnswerDTO,
  ItemTestQuestionsDTO,
  ItemTestQuestionAnswersDTO,
  ItemTestQuestionsRezultDTO,
  RezultTestDTO,
  UserStatisticDTO,
  UserStatisticRezultDTO,
  DirectProgrammingTestDTO,
  ItemTestEditDTO,
  QuestionEditDTO,
  AnswerEditDTO,
  UserBaseDTO,
  UserAdminDTO,
  UserNewDTO,
  UserAdminListDTO,
  UserAdminListItemDTO,
  UserNewAdminDTO,
  GetUserAdminDTO,
  GetUserStatisticAdminDTO,
  GeRezultTestDTO,
  GetItemTestEditDTO,
  PasswordResetDTO,
  GetItemTestDTO,
};
