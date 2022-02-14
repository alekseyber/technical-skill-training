import { GETBaseDTOUseParams } from '.';

export interface UserStatisticRezultDTO {
  _id: string;
  quizId: string;
  title: string;
  createdAt: string;
  rezultTest: boolean;
  numberOfQuestions: number;
  numberOfСorrectQuestions: number;
  rezultTime: string;
}

export interface UserStatisticDTO {
  userId: string;
  name: string;
  surname: string;
  rezults: UserStatisticRezultDTO[];
}

export type GetUserStatisticAdminDTO = GETBaseDTOUseParams<'_id'>;
