import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '_id раздела категории' })
  @IsNotEmpty()
  @IsMongoId()
  categoryId: string;
}

export class UpdateQuizDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: false,
    default: false,
    description:
      'Включен/выключен - включить можно только если есть хотя бы один вопрос и один ответ на него',
  })
  @IsOptional()
  status?: boolean;

  @ApiProperty({ description: '_id раздела категории' })
  @IsOptional()
  @IsNotEmpty()
  @IsMongoId()
  categoryId: string;

  @ApiProperty({
    default: 0,

    description: 'Время на тест, если 0 - бесконечно.',
  })
  @IsOptional()
  @IsNotEmpty()
  timer: number;

  @ApiProperty({
    description:
      'Количество вопросов на сессию, может быть меньше общего числа вопросов, тогда сервис произвольно выбирает указанное количество вопросов.',
  })
  @IsOptional()
  @IsNotEmpty()
  numberOfQuestions: number;

  @ApiProperty({
    minimum: 1,
    description:
      'Количество правильных ответов для положительного результата. Если при оценке результата превышает количество вопросов в сессию, будет равно количеству вопросов.',
  })
  @IsOptional()
  @IsNotEmpty()
  correcToPass: number;
}

export class ItemChildQuizzesForCatalog {
  @ApiProperty()
  title: string;
  @ApiProperty()
  _id: string;
  @ApiProperty()
  status: boolean;
}

export type QuizzesForCatalog = Record<string, ItemChildQuizzesForCatalog[]>;

interface QuizForRezultAnswers {
  answer: string;
  loyal: boolean;
}

interface QuizForRezultQuestions {
  question: string;
  multiple: boolean;
  answers: Record<string, QuizForRezultAnswers>;
  countLoayl: number;
}

export type QuizForRezultQuestionsMap = Record<string, QuizForRezultQuestions>;

export interface QuizForRezult {
  _id: string;
  title: string;
  timer: number;
  correcToPass: number;
  questions: QuizForRezultQuestionsMap;
}
