import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuizTrialDto } from 'src/quizzes/dto/quizTrialDto';
import { UserRole } from 'src/users/schemas/user.schema';
import { TrialService } from './trial.service';

@ApiBearerAuth(UserRole.USER)
@ApiTags('trial')
@Controller('trial')
export class TrialController {
  constructor(private trialService: TrialService) {}

  @Get()
  @ApiOperation({ summary: 'Начать тест' })
  @ApiResponse({
    status: 200,
    description: 'Вопросы',
    type: QuizTrialDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async startTrial(@Query('_id') _id: string) {
    return this.trialService.startTrial(_id);
  }
}
