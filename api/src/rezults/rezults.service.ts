import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoDto } from 'src/dto/baseMongoDto';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { TrialService } from 'src/trial/trial.service';
import { UsersService } from 'src/users/users.service';
import { getTimeDataDiff } from 'src/utils/getTimeDataDiff';

import {
  ItemTestQuestionsRezultDTO,
  RezultItem,
  UserRezultMap,
  RezultRegistrationDto,
  RezultItemQuestionFailed,
  UserStatisticItemUser,
  userStatisticItemRezultProjection,
  UserStatisticItemRezult,
} from './dto/rezultRegistrationDto';
import { Rezult, RezultDocument } from './schemas/rezult.schema';

@Injectable()
export class RezultsService {
  constructor(
    @InjectModel(Rezult.name)
    private rezultModel: Model<RezultDocument>,
    private trialService: TrialService,
    private quizzesService: QuizzesService,
    private usersService: UsersService
  ) {}

  async create(rezultItem: RezultItem): Promise<RezultDocument> {
    const createdRezultItem = new this.rezultModel(rezultItem);
    return createdRezultItem.save();
  }

  async findById(_id: string): Promise<RezultDocument> {
    const doc = await this.rezultModel.findById(_id);
    if (!doc) throw new NotFoundException('Результат не найден');
    return doc;
  }
  async deleteById(_id: string): Promise<BaseMongoDto> {
    const doc = await this.findById(_id);
    await doc.deleteOne();
    return { _id };
  }
  async findAllByUserId(userId: string): Promise<UserStatisticItemUser> {
    const rezults = await this.rezultModel.find(
      { userId },
      userStatisticItemRezultProjection
    );
    const user = await this.usersService.findById(userId);

    const rezult: UserStatisticItemUser = {
      userId,
      name: user.name,
      surname: user.surname,
      rezults: rezults as unknown as UserStatisticItemRezult[],
    };

    return rezult;
  }

  async findByIdAndСurrentUserId(_id: string): Promise<RezultDocument> {
    const userId = this.usersService.getСurrentUserId();

    const doc = await this.rezultModel.findOne({ _id, userId });
    if (!doc) throw new NotFoundException('Результат не найден');
    return doc;
  }

  async findAllAndСurrentUserId(): Promise<UserStatisticItemUser> {
    const userId = this.usersService.getСurrentUserId();
    return this.findAllByUserId(userId);
  }

  async rezultRegistration(
    rezultRegistrationDto: RezultRegistrationDto
  ): Promise<ItemTestQuestionsRezultDTO> {
    const trial = await this.trialService.getTrial(
      rezultRegistrationDto.sesionId
    );
    const quizId = trial.quizId;

    await this.trialService.deleteById(rezultRegistrationDto.sesionId);

    const quizForRezult = await this.quizzesService.getQuizForRezult(quizId);

    const { rezultTime, diff } = getTimeDataDiff(trial.createdAt);

    if (quizForRezult.timer > 0 && quizForRezult.timer + 3 < diff) {
      throw new NotFoundException(
        'Время на тест истекло раньше, чем был отправлен результат.'
      );
    }
    const numberOfQuestions = trial.questionsIds.length;

    const rezultItem: RezultItem = {
      quizId,
      userId: trial.userId,
      title: quizForRezult.title,
      rezultTest: false,
      rezultTime,
      numberOfQuestions,
      numberOfСorrectQuestions: 0,
      failedDetails: [],
      successfully: [],
      failed: [],
    };

    const userRezultMap: UserRezultMap = {};

    rezultRegistrationDto.answers.forEach((answer) => {
      userRezultMap[answer.questionId] = {
        answers: answer.answersId,
      };
    });

    for (const questionId of trial.questionsIds) {
      let itemRezult = false;

      if (quizForRezult.questions[questionId] && userRezultMap[questionId]) {
        if (
          quizForRezult.questions[questionId].countLoayl ===
          userRezultMap[questionId].answers.length
        ) {
          let intermediateRezult = true;
          userRezultMap[questionId].answers.forEach((answerId) => {
            if (!quizForRezult.questions[questionId].answers[answerId].loyal) {
              intermediateRezult = false;
            }
          });
          itemRezult = intermediateRezult;
        }
      }
      if (itemRezult) {
        rezultItem.successfully.push(questionId);
        rezultItem.numberOfСorrectQuestions++;
      } else {
        rezultItem.failed.push(questionId);
        const failedDetails: RezultItemQuestionFailed = {
          question: quizForRezult.questions[questionId].question,
          answers: [],
        };
        userRezultMap[questionId].answers.forEach((answerId) => {
          failedDetails.answers.push({
            answer:
              quizForRezult.questions[questionId].answers[answerId].answer,
          });
        });
        rezultItem.failedDetails.push(failedDetails);
      }
    }
    const correcToPass =
      quizForRezult.correcToPass <= numberOfQuestions
        ? quizForRezult.correcToPass
        : numberOfQuestions;

    rezultItem.rezultTest = rezultItem.numberOfСorrectQuestions >= correcToPass;
    const doc = await this.create(rezultItem);

    return { rezultId: doc._id };
  }
}
