import { AxiosError } from '@src/api/HttpClient';

interface ResponseBase {
  status: number;
  statusText: string;
  data: {
    message: string;
    statusCode: number;
  };
}

interface ErrorFetchBase {
  message: string;
  response: ResponseBase;
}

export type ErrorFetchApp = AxiosError | ErrorFetchBase;
