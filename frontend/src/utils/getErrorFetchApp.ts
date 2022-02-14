import { ErrorFetchApp } from '@src/types';

function getErrorFetchApp<E>(err: E, defaultMessage = 'Ошибка запроса на сервер'): ErrorFetchApp {
  const isError = err instanceof Error;
  const message = isError ? err.message : defaultMessage;

  const error = isError ? err : new Error(message);
  const newError: ErrorFetchApp = {
    response: { status: 0, statusText: '', data: { message: '', statusCode: 0 } },
    ...error,
  };
  if (newError.response.statusText && (!newError?.message || newError?.message === defaultMessage)) {
    newError.message = newError.response.statusText;
  }

  return newError;
}

export { getErrorFetchApp };
