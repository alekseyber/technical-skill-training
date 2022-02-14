import { GETBaseDTOUseParams } from ".";

export interface AnswerDTO {
  _id: string;
  answer: string;
  orderValue: number;
}

export interface QuestionDTO {
  _id: string;
  multiple: boolean;
  question: string;
  answers: AnswerDTO[];
}

export interface ItemTestDTO {
  _id: string;
  title: string;
  sesionId: string;
  timer: number;
  questions: QuestionDTO[];
}

export interface ItemTestRezultDTO {
  rezultId: string;
}

export type GetItemTestDTO = GETBaseDTOUseParams<"_id">;
