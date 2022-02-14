import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { BaseMongoDto } from 'src/dto/baseMongoDto';
import { UserRole } from 'src/users/schemas/user.schema';
import { CreateQuizDto, UpdateQuizDto } from './dto/quizDto';
import {
  CreateQuizQuestionDto,
  UpdateQuizQuestionDto,
} from './dto/quizQuestionDto';
import { QuizzesService } from './quizzes.service';
import { QuizResponse } from './schemas/quiz.schema';
import { QuizQuestion } from './schemas/quizQuestion.schema';

@ApiTags('quizzes')
@ApiBearerAuth(UserRole.ADMIN)
@Controller('quizzes')
export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}

  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - тест по _id',
  })
  @ApiResponse({
    status: 200,
    description: 'Тест',
    type: QuizResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async getItem(@Query('_id') _id: string) {
    return this.quizzesService.findById(_id);
  }

  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - создать тест',
  })
  @ApiResponse({
    status: 201,
    description: 'Новый тест',
    type: QuizResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async createCatalog(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - обновить тест',
  })
  @ApiResponse({
    status: 200,
    description: 'Тест',
    type: QuizResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put()
  async updateQuiz(@Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.update(updateQuizDto);
  }

  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - частично обновить тест',
  })
  @ApiResponse({
    status: 200,
    description: 'Тест только переданные поля',
    type: QuizResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Patch()
  async updateQuizPatch(@Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.update(updateQuizDto);
  }

  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - удаление теста по _id',
  })
  @ApiResponse({
    status: 200,
    description: 'Удален',
    type: BaseMongoDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete()
  async deleteCatalog(@Query('_id') _id: string) {
    return this.quizzesService.deleteById(_id);
  }

  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - новый вопрос',
  })
  @ApiResponse({
    status: 201,
    description: 'Новый вопрос',
    type: QuizQuestion,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('question')
  async createQuestion(@Body() createQuizQuestionDto: CreateQuizQuestionDto) {
    return this.quizzesService.createQuestion(createQuizQuestionDto);
  }
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - обновить вопрос',
  })
  @ApiResponse({
    status: 200,
    description: 'Новый вопрос',
    type: QuizQuestion,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put('question')
  async updateQuestion(@Body() updateQuizQuestionDto: UpdateQuizQuestionDto) {
    return this.quizzesService.updateQuestion(updateQuizQuestionDto);
  }

  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Администратор - удалить вопрос',
  })
  @ApiResponse({
    status: 200,
    description: 'Удален',
    type: BaseMongoDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete('question')
  async deleteQuestion(@Query('_id') _id: string) {
    return this.quizzesService.deleteQuestion(_id);
  }
}
