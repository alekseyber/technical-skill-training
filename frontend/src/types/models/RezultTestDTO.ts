import { GETBaseDTOUseParams } from '.';

interface RezultTestAnswerDTO {
  _id: string;
  answer: string;
}

interface RezultTestQuestionDTO {
  _id: string;
  question: string;
  answers: RezultTestAnswerDTO[];
}

export interface RezultTestDTO {
  _id: string;
  userId: string;
  rezultTest: boolean;
  numberOfQuestions: number;
  numberOfСorrectQuestions: number;
  rezultTime: string;
  title: string;
  failedDetails: RezultTestQuestionDTO[];
}

export type GeRezultTestDTO = GETBaseDTOUseParams<'_id'>;
