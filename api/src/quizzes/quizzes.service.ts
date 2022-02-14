import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { BaseMongoDto } from 'src/dto/baseMongoDto';
import { Rezult, RezultDocument } from 'src/rezults/schemas/rezult.schema';

import {
  CreateQuizDto,
  QuizForRezult,
  QuizForRezultQuestionsMap,
  QuizzesForCatalog,
  UpdateQuizDto,
} from './dto/quizDto';
import {
  CreateQuizQuestionDto,
  UpdateQuizQuestionDto,
} from './dto/quizQuestionDto';
import { QuestionTrial, QuizTrialDto } from './dto/quizTrialDto';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { QuizQuestionDocument } from './schemas/quizQuestion.schema';

interface GetQuizzesMatch {
  $match: {
    status?: true;
    categoryId?: string;
  };
}

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz.name)
    private quizModel: Model<QuizDocument>,
    @InjectModel(Rezult.name)
    private rezultModel: Model<RezultDocument>
  ) {}

  async findById(_id: string): Promise<QuizDocument> {
    const doc = await this.quizModel.findById(_id);
    if (!doc) throw new NotFoundException('Тест не найден');
    return doc;
  }

  async findByIdOnStatus(_id: string): Promise<QuizDocument> {
    const doc = await this.quizModel.findOne({ _id, status: true });
    if (!doc) throw new NotFoundException('Тест не найден');
    return doc;
  }

  async findByTrial(_id: string): Promise<QuizTrialDto> {
    const quiz = await this.findByIdOnStatus(_id);
    const countQuestions = quiz.questions.length;
    const numberOfQuestions =
      quiz.numberOfQuestions < 1 ? 1 : quiz.numberOfQuestions;

    const rezultSize =
      countQuestions >= numberOfQuestions ? numberOfQuestions : countQuestions;

    const questions = await this.quizModel.aggregate<QuestionTrial>([
      { $match: { _id: new mongo.ObjectId(_id) } },
      {
        $project: {
          _id: 0,
          questions: 1,
        },
      },
      { $unwind: '$questions' },
      {
        $project: {
          _id: '$questions._id',
          multiple: '$questions.multiple',
          question: '$questions.question',
          answers: '$questions.answers',
        },
      },
      {
        $sample: {
          size: rezultSize,
        },
      },
      { $unwind: '$answers' },
      {
        $project: {
          _id: '$_id',
          multiple: '$multiple',
          question: '$question',
          answersId: '$answers._id',
          orderValue: '$answers.orderValue',
          answer: '$answers.answer',
        },
      },
      {
        $group: {
          _id: '$_id',
          multiple: { $first: '$multiple' },
          question: { $first: '$question' },
          answers: {
            $addToSet: {
              _id: '$answersId',
              orderValue: '$orderValue',
              answer: '$answer',
            },
          },
        },
      },
    ]);

    const rezult: QuizTrialDto = {
      _id,
      sesionId: '',
      title: quiz.title,
      timer: quiz.timer,
      questions,
    };
    return rezult;
  }

  async isAllowedToDeleteByQuizId(quizId: string): Promise<boolean> {
    const count = await this.rezultModel.count({
      quizId,
    });
    return count === 0;
  }

  async deleteById(_id: string): Promise<BaseMongoDto> {
    const isAllowedToDelete = await this.isAllowedToDeleteByQuizId(_id);
    if (!isAllowedToDelete) {
      throw new ConflictException(
        'Удалить не представляется возможным, т.к уже есть результаты тестирования.'
      );
    }
    const doc = await this.findById(_id);
    await doc.deleteOne();
    return { _id };
  }

  async create(createQuizDto: CreateQuizDto): Promise<QuizDocument> {
    const createdQuiz = new this.quizModel(createQuizDto);
    return createdQuiz.save();
  }

  async update(updateQuizDto: UpdateQuizDto): Promise<QuizDocument> {
    const { _id, ...data } = updateQuizDto;
    const quiz = await this.findById(_id);

    if (quiz.questions.length === 0 && data?.status) {
      throw new ConflictException(
        'Включение не возможно, т.к. нет ни одного вопроса'
      );
    }
    await quiz.updateOne(data, {
      fields: data,
    });

    if (!quiz) throw new NotFoundException('Тест не найден');

    return quiz;
  }

  async getQuizzes(
    isAdmin = false,
    categoryId?: string
  ): Promise<QuizzesForCatalog> {
    const $match: GetQuizzesMatch = isAdmin
      ? { $match: {} }
      : { $match: { status: true } };

    if (categoryId) {
      $match.$match.categoryId = categoryId;
    }

    const aggregate = await this.quizModel.aggregate([
      $match,
      {
        $project: {
          title: 1,
          categoryId: 1,
          status: 1,
        },
      },
      { $sort: { title: 1 } },
      {
        $group: {
          _id: '$categoryId',
          quizzes: {
            $addToSet: { title: '$title', _id: '$_id', status: '$status' },
          },
        },
      },
      { $addFields: { groupselect: 'group' } },
      { $addFields: { newobj: { $arrayToObject: [[['$_id', '$quizzes']]] } } },
      {
        $group: {
          _id: 'groupselect',
          group: { $mergeObjects: '$newobj' },
        },
      },
    ]);

    return aggregate[0]?.group || {};
  }

  async findOneQuestion(_id: string): Promise<QuizDocument> {
    const doc = await this.quizModel.findOne(
      {
        'questions._id': _id,
      },
      { questions: true }
    );
    if (!doc) throw new NotFoundException('Вопрос не найден');
    return doc;
  }

  async createQuestion(
    createQuizQuestionDto: CreateQuizQuestionDto
  ): Promise<QuizQuestionDocument> {
    const { parentId, ...data } = createQuizQuestionDto;

    if (data.answers.length === 0) {
      throw new ConflictException(
        'Сохранить не возможно, т.к. нет ни одного ответа'
      );
    }

    const doc = await this.findById(parentId);

    doc.questions.push(data);

    await doc.save();

    const question = doc.questions[doc.questions.length - 1];

    return question;
  }

  async updateQuestion(
    updateQuizQuestionDto: UpdateQuizQuestionDto
  ): Promise<QuizQuestionDocument> {
    const { _id, ...data } = updateQuizQuestionDto;

    if (data.answers.length === 0) {
      throw new ConflictException(
        'Сохранить не возможно, т.к. нет ни одного ответа'
      );
    }

    const doc = await this.findOneQuestion(_id);
    const question = doc.questions.id(_id);

    Object.keys(data).forEach((key) => {
      question[key] = data[key];
    });
    await doc.save();

    return question;
  }

  async deleteQuestion(_id: string): Promise<BaseMongoDto> {
    const doc = await this.findOneQuestion(_id);

    doc.questions.id(_id).remove();

    await doc.save();

    return { _id };
  }

  async getQuizForRezult(_id: string): Promise<QuizForRezult> {
    const doc = await this.findById(_id);
    const questions: QuizForRezultQuestionsMap = {};

    doc.questions.forEach((question) => {
      questions[question._id] = {
        question: question.question,
        multiple: question.multiple,
        answers: {},
        countLoayl: 0,
      };
      question.answers.forEach((answer) => {
        if (answer.loyal) {
          questions[question._id].countLoayl++;
        }
        questions[question._id].answers[answer._id] = {
          answer: answer.answer,
          loyal: answer.loyal,
        };
      });
    });

    return {
      _id: doc._id,
      title: doc.title,
      timer: doc.timer,
      correcToPass: doc.correcToPass,
      questions,
    };
  }
}
