import { GETBaseDTOUseParams } from '.';

export interface AnswerEditDTO {
  _id: string;
  answer: string;
  loyal: boolean;
  orderValue: number;
}

export interface QuestionEditDTO {
  _id: string;
  multiple: boolean;
  question: string;
  parentId?: string;
  answers: AnswerEditDTO[];
}

export interface ItemTestEditDTO {
  _id: string;
  title: string;
  timer: number;
  status: boolean;
  categoryId: string;
  numberOfQuestions: number;
  correcToPass: number;
  questions: QuestionEditDTO[];
}

export type GetItemTestEditDTO = GETBaseDTOUseParams<'_id'>;
