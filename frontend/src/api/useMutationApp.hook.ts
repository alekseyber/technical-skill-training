import { useCallback } from 'react';
import { BaseDTO, TypeNameEnum, RequestSaveDTO, AuthDTO } from '@src/types/models';
import { useAppActions } from '@src/store/useRedux.hook';
import { getErrorFetchApp } from '@src/utils/getErrorFetchApp';
import { ErrorFetchApp } from '@src/types';
import { HttpClient, RESTAPIMetodsEnum } from './HttpClient';

export type FeldName<DTO> = keyof Omit<DTO, '_id'>;

export type DTOResponse<DTO> = DTO & Partial<BaseDTO>;

type OnErrorFunction = (error: ErrorFetchApp) => void;

export interface CallbackSaveFieldCompleteData<DTO> {
  data: DTOResponse<DTO>;
  parentId?: string;
  fieldName: FeldName<DTO>;
  added: boolean;
  typeName: TypeNameEnum;
}

interface CallbackSaveFieldProps<DTO> {
  _id: string;
  parentId?: string;
  additionalData?: Partial<Omit<DTO, '_id'>>;
  fieldName: FeldName<DTO>;
  typeName: TypeNameEnum;
  onError?: OnErrorFunction;
  onComplete?: (props: CallbackSaveFieldCompleteData<DTO>) => void;
}

export interface CallbackSaveCompleteData<DTO> {
  _id: string;
  data: DTOResponse<DTO>;
  parentId?: string;
  added: boolean;
  typeName: TypeNameEnum;
}

interface CallbackSaveProps<DTO> {
  _id: string;
  parentId?: string;
  typeName: TypeNameEnum;
  onError?: OnErrorFunction;
  onComplete?: (props: CallbackSaveCompleteData<DTO>) => void;
  onLogin?: () => void;
}

export interface CallbackDeleteCompleteData {
  _id: string;
  typeName: TypeNameEnum;
}

interface CallbackDeleteProps {
  _id: string;
  typeName: TypeNameEnum;
  onError?: OnErrorFunction;
  onComplete?: (props: CallbackDeleteCompleteData) => void;
}

interface UseMutationApp {
  callbackSaveField: <DTO, V = string>(props: CallbackSaveFieldProps<DTO>) => (value: V) => Promise<void>;
  callbackSave: <DTO>(props: CallbackSaveProps<DTO>) => (value: Partial<DTO>) => Promise<void>;
  callbackDelete: (props: CallbackDeleteProps) => () => Promise<void>;
}

const useMutationApp = (): UseMutationApp => {
  const { showAlert, setLogin } = useAppActions();

  const callbackSaveField = useCallback(
    function <DTO, V = string>({
      _id = '',
      parentId,
      additionalData,
      fieldName,
      typeName,
      onError,
      onComplete,
    }: CallbackSaveFieldProps<DTO>) {
      return async (value: V) => {
        try {
          const added = !_id;

          const request = { [fieldName]: value, ...additionalData, _id };

          const method = added ? RESTAPIMetodsEnum.POST : RESTAPIMetodsEnum.PATCH;
          const { data } = await HttpClient.getAppAPI<DTOResponse<DTO>>(typeName, request, method);

          if (onComplete) {
            const rezult: CallbackSaveFieldCompleteData<DTO> = {
              data,
              parentId,
              fieldName,
              added,
              typeName,
            };
            onComplete(rezult);
          }
        } catch (err) {
          const error = getErrorFetchApp(err);
          showAlert(error.response?.data.message || error.message);
          if (onError) onError(error);
          throw error;
        }
      };
    },
    [showAlert]
  );
  const callbackSave = useCallback(
    function <DTO>({ _id = '', parentId, typeName, onError, onComplete, onLogin }: CallbackSaveProps<DTO>) {
      return async (dataValue: Partial<DTO>) => {
        try {
          const added = !_id;

          const method = added ? RESTAPIMetodsEnum.POST : RESTAPIMetodsEnum.PUT;

          if (onLogin) {
            const { data } = await HttpClient.getAppAPI<AuthDTO, Partial<DTO>>(typeName, dataValue, method);
            setLogin(data);
            return onLogin();
          }
          const request: RequestSaveDTO<DTO> = { _id, ...dataValue };
          const { data } = await HttpClient.getAppAPI<DTOResponse<DTO>, RequestSaveDTO<DTO>>(
            typeName,
            request,
            method
          );

          if (onComplete) {
            const rezult: CallbackSaveCompleteData<DTO> = {
              data,
              parentId,
              _id: data?._id || '',
              added,
              typeName,
            };
            onComplete(rezult);
          }
        } catch (err) {
          const error = getErrorFetchApp(err);
          showAlert(error.response?.data.message || error.message);
          if (onError) onError(error);
          throw error;
        }
      };
    },
    [showAlert, setLogin]
  );
  const callbackDelete = useCallback(
    function ({ _id, typeName, onError, onComplete }: CallbackDeleteProps) {
      return async () => {
        try {
          const request: BaseDTO = { _id };

          await HttpClient.getAppAPI<BaseDTO, BaseDTO>(typeName, request, RESTAPIMetodsEnum.DELETE);

          if (onComplete) {
            const rezult: CallbackDeleteCompleteData = {
              _id,
              typeName,
            };
            onComplete(rezult);
          }
        } catch (err) {
          const error = getErrorFetchApp(err);
          showAlert(error.response?.data.message || error.message);
          if (onError) onError(error);
          throw error;
        }
      };
    },
    [showAlert]
  );

  return { callbackSaveField, callbackDelete, callbackSave };
};

export { useMutationApp };
