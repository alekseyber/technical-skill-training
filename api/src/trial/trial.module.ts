import { Module } from '@nestjs/common';
import { TrialService } from './trial.service';
import { TrialController } from './trial.controller';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { UsersModule } from 'src/users/users.module';
import { Trial, TrialSchema } from './schemas/trial.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    QuizzesModule,
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Trial.name,
        schema: TrialSchema,
      },
    ]),
  ],
  providers: [TrialService],
  controllers: [TrialController],
  exports: [TrialService],
})
export class TrialModule {}
