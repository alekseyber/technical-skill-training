import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsArray } from 'class-validator';
import { RezultDocument } from '../schemas/rezult.schema';

class RezultRegistrationAnswer {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  questionId: string;

  @ApiProperty()
  @IsArray()
  answersId: string[];
}

export class RezultRegistrationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  sesionId: string;

  @ApiProperty({
    type: [RezultRegistrationAnswer],
  })
  @IsArray()
  @IsNotEmpty()
  answers: RezultRegistrationAnswer[];
}

export class ItemTestQuestionsRezultDTO {
  @ApiProperty()
  rezultId: string;
}

interface UserRezultMapBase {
  answers: string[];
}

export type UserRezultMap = Record<string, UserRezultMapBase>;

interface RezultItemAnswer {
  answer: string;
}

export interface RezultItemQuestionFailed {
  question: string;
  answers: RezultItemAnswer[];
}

export class RezultItem {
  userId: string;
  quizId: string;
  title: string;
  rezultTest: boolean;
  rezultTime: string;
  numberOfQuestions: number;
  numberOfСorrectQuestions: number;
  failedDetails: RezultItemQuestionFailed[];
  successfully: string[];
  failed: string[];
}

export const userStatisticItemRezultProjection = {
  quizId: true,
  title: true,
  createdAt: true,
  rezultTest: true,
  numberOfQuestions: true,
  numberOfСorrectQuestions: true,
  rezultTime: true,
};

export class UserStatisticItemRezult {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  quizId: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  rezultTest: boolean;
  @ApiProperty()
  numberOfQuestions: number;
  @ApiProperty()
  numberOfСorrectQuestions: number;
  @ApiProperty()
  rezultTime: string;
}

export class UserStatisticItemUser {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty({ type: [UserStatisticItemRezult] })
  rezults: UserStatisticItemRezult[];
}
