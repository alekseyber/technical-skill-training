import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UserRole } from './users/schemas/user.schema';

async function bootstrap() {
  if (!process.env.API_SECRET_KEY)
    throw new Error('API_SECRET_KEY - not found');

  const PORT = process.env.PORT || 5000;

  const API_SWAGGER_SERVER_API_URL =
    process.env.API_SWAGGER_SERVER_API_URL || '';

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Сервис для тренировки технических скилов')
    .setDescription('Описание API сервиса')
    .setVersion('1.0')
    .addTag('alexvb')
    .addServer(API_SWAGGER_SERVER_API_URL)
    .addBearerAuth(
      {
        description: UserRole.USER,
        type: 'http',
      },
      UserRole.USER
    )
    .addBearerAuth(
      {
        description: UserRole.ADMIN,
        type: 'http',
      },
      UserRole.ADMIN
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT, () =>
    console.log(`API server started on port = ${PORT}`)
  );
}
bootstrap();
