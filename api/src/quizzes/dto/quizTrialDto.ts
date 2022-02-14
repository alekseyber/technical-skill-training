import { ApiProperty } from '@nestjs/swagger';

class Answer {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  answer: string;
  @ApiProperty()
  orderValue: number;
}

export class QuestionTrial {
  @ApiProperty()
  _id: string;
  multiple: boolean;
  @ApiProperty()
  question: string;
  @ApiProperty({ type: [Answer] })
  answers: Answer[];
}

export class QuizTrialDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  sesionId: string;
  @ApiProperty()
  timer: number;
  @ApiProperty({ type: [QuestionTrial] })
  questions: QuestionTrial[];
}
