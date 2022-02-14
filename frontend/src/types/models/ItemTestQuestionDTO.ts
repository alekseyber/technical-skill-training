export interface ItemTestQuestionAnswersDTO {
  questionId: string;
  answersId: string[];
}

export interface ItemTestQuestionsDTO {
  sesionId: string;
  answers: ItemTestQuestionAnswersDTO[];
}

export interface ItemTestQuestionsRezultDTO {
  rezultId: string;
}
