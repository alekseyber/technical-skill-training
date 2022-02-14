import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { UseritemGuard } from './auth/useritem.guard';
import { CatalogModule } from './catalog/catalog.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { MongoFilter } from './mongo-exception.filter';
import { QuizzesModule } from './quizzes/quizzes.module';
import { TrialModule } from './trial/trial.module';
import { RezultsModule } from './rezults/rezults.module';
import { EmailModule } from './email/email.module';
import { SettingsModule } from './settings/settings.module';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://api_db:27017/api';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL),
    UsersModule,
    AuthModule,
    CatalogModule,
    QuizzesModule,
    TrialModule,
    RezultsModule,
    EmailModule,
    SettingsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UseritemGuard,
    },
    {
      provide: APP_FILTER,
      useClass: MongoFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
