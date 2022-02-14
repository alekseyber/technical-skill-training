import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsMongoId,
  IsInt,
} from 'class-validator';

class AnswerDto {
  @ApiProperty({
    required: false,
    default: false,
    description: 'Указывает на правильный ответ',
  })
  @IsOptional()
  loyal?: boolean;

  @ApiProperty({
    description: 'Вариант ответа',
  })
  @IsNotEmpty()
  answer: string;

  @ApiProperty({
    default: 0,
    required: false,
    description: 'Значение для сортировки, последовательномти вывода',
  })
  @IsOptional()
  @IsInt()
  orderValue: number;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  _id: string;
}

export class BaseQuizQuestionDto {
  @ApiProperty({
    default: false,
    required: false,
    description: 'Может быть несколько правильных ответов',
  })
  @IsOptional()
  multiple?: boolean;

  @ApiProperty({
    description: 'Вопрос',
  })
  @IsNotEmpty()
  question: string;
}

export class CreateQuizQuestionDto extends BaseQuizQuestionDto {
  @ApiProperty({
    description: '_id родительского теста',
  })
  @IsNotEmpty({
    message: 'parentId - не может быть пустым',
  })
  @IsMongoId()
  parentId: string;

  @ApiProperty({
    type: [AnswerDto],
    description: 'для сохранения должен иметь минимум 1 элемент',
  })
  @IsArray()
  answers: AnswerDto[];
}

export class UpdateQuizQuestionDto extends BaseQuizQuestionDto {
  @ApiProperty()
  @IsMongoId()
  _id: string;

  @ApiProperty({
    type: [AnswerDto],
    description: 'для сохранения должен иметь минимум 1 элемент',
  })
  @IsArray()
  answers: AnswerDto[];
}
