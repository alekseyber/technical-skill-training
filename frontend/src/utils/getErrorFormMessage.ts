import { FieldError } from "react-hook-form";

export const getErrorFormMessage = (
  fieldLabel: string,
  fieldError: FieldError | undefined
): string => {
  if (!fieldError) return "";
  const typeError: string = fieldError?.type || "";
  const addMessage = fieldError?.message ? fieldError.message : "";

  switch (typeError) {
    case "required": {
      return `Пожалуйста, введите ${fieldLabel}`;
    }
    case "confirm": {
      return `Пароли должны совпадать`;
    }
    case "pattern": {
      return `Пожалуйста, введите правильно ${fieldLabel}`;
    }
    case "checkUniq": {
      return `Введенное в ${fieldLabel} значение не является уникальным`;
    }
    case "apiError": {
      return `В поле ${fieldLabel} ошибка c API: ${addMessage}`;
    }
    case "maxLength": {
      return `Введенное в ${fieldLabel} значение, превышает заданное количество симовлов`;
    }
    case "minLength": {
      return `Введенное в ${fieldLabel} значение, меньше заданного количества симовлов`;
    }
    case "min": {
      return `Введенное в ${fieldLabel} значение, меньше заданного`;
    }
    case "max": {
      return `Введенное в ${fieldLabel} значение, больше заданного`;
    }
    case "integer": {
      return `Введенное в ${fieldLabel} значение, не является целым числом`;
    }

    default: {
      return `В поле ${fieldLabel} ошибка ${addMessage}`;
    }
  }
};
