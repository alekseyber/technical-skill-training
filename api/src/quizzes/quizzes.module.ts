import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Rezult, RezultSchema } from 'src/rezults/schemas/rezult.schema';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { Quiz, QuizSchema } from './schemas/quiz.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Quiz.name,
        schema: QuizSchema,
      },
      {
        name: Rezult.name,
        schema: RezultSchema,
      },
    ]),
  ],
  providers: [QuizzesService],
  controllers: [QuizzesController],
  exports: [QuizzesService],
})
export class QuizzesModule {}
