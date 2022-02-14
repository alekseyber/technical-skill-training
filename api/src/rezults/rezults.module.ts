import { Module } from '@nestjs/common';
import { RezultsService } from './rezults.service';
import { RezultsController } from './rezults.controller';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { TrialModule } from 'src/trial/trial.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Rezult, RezultSchema } from './schemas/rezult.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TrialModule,
    UsersModule,
    QuizzesModule,
    MongooseModule.forFeature([
      {
        name: Rezult.name,
        schema: RezultSchema,
      },
    ]),
  ],
  providers: [RezultsService],
  controllers: [RezultsController],
  exports: [RezultsService],
})
export class RezultsModule {}
