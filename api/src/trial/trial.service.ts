import { Injectable, NotFoundException } from '@nestjs/common';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { UsersService } from 'src/users/users.service';
import { Trial, TrialDocument } from './schemas/trial.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuizTrialDto } from 'src/quizzes/dto/quizTrialDto';

@Injectable()
export class TrialService {
  constructor(
    @InjectModel(Trial.name)
    private trialModel: Model<TrialDocument>,
    private quizzesService: QuizzesService,
    private usersService: UsersService
  ) {}

  async startTrial(quizId: string): Promise<QuizTrialDto> {
    const userId = this.usersService.getСurrentUserId();
    const quiz = await this.quizzesService.findByTrial(quizId);
    const questionsIds: string[] = [];
    quiz.questions.forEach((question) => {
      questionsIds.push(question._id);
    });

    const createdTrial = new this.trialModel({
      userId,
      quizId,
      questionsIds,
    });

    await createdTrial.save();

    quiz.sesionId = createdTrial._id;
    return quiz;
  }

  async getTrial(sesionId: string): Promise<TrialDocument> {
    const userId = this.usersService.getСurrentUserId();

    const trialDoc = await this.trialModel.findOne({
      _id: sesionId,
      userId,
    });
    if (!trialDoc)
      throw new NotFoundException(
        'Начало тестирования по этому тесту не зарегистрировано для данного пользователя.'
      );

    return trialDoc;
  }

  async deleteById(_id: string): Promise<boolean> {
    await this.trialModel.deleteOne({ _id });
    return true;
  }
}
