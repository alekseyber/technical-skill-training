import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Response } from 'express';

@Catch(MongoError)
export class MongoFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const newException = { keyPattern: {}, keyValue: {}, ...exception };
    const fieldName = Object.keys(newException.keyPattern)[0] || '';
    const fieldValue = newException.keyValue[fieldName] || '';

    if (exception.code === 11000) {
      const errorReq = {
        message: `Ошибка валидаци данных ${fieldName} ${fieldValue}`,
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: new Date().toISOString(),
      };

      response.status(HttpStatus.BAD_REQUEST).json(errorReq);
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal error.',
        timestamp: new Date().toISOString(),
      });
    }
  }
}
