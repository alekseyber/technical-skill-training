import {
  SetIsLoadingAction,
  SetDataAction,
  SetErrorAction,
  ProgTestsActionEnum,
  TypeNameMutationUnion,
  ResetExpiresAction,
} from './types';
import { TestsDTO, TypeNameEnum } from '@src/types/models';
import { AppDispatch, GetState } from '@src/store/index';
import { ErrorFetchApp } from '@src/types';
import { CallbackSaveFieldCompleteData, CallbackDeleteCompleteData } from '@src/api/useMutationApp.hook';
import { HttpClient } from '@src/api/HttpClient';

const getTypeName = (typeName: string): undefined | TypeNameMutationUnion =>
  typeName === TypeNameEnum.DIRECT_PROGRAMMING ||
  typeName === TypeNameEnum.DIRECT_PROGRAMMING_CHARTER ||
  typeName === TypeNameEnum.DIRECT_PROGRAMMING_TEST
    ? typeName
    : undefined;

const getTypeActionByMutationPropsTypeName = (
  typeName: TypeNameMutationUnion,
  added = false,
  deled = false
) => {
  const mapSettings = [
    {
      [TypeNameEnum.DIRECT_PROGRAMMING]: ProgTestsActionEnum.ADD_MUTATION_LEVEL_1,
      [TypeNameEnum.DIRECT_PROGRAMMING_CHARTER]: ProgTestsActionEnum.ADD_MUTATION_LEVEL_2,
      [TypeNameEnum.DIRECT_PROGRAMMING_TEST]: ProgTestsActionEnum.ADD_MUTATION_LEVEL_3,
    },
    {
      [TypeNameEnum.DIRECT_PROGRAMMING]: ProgTestsActionEnum.UPDATE_MUTATION_LEVEL_1,
      [TypeNameEnum.DIRECT_PROGRAMMING_CHARTER]: ProgTestsActionEnum.UPDATE_MUTATION_LEVEL_2,
      [TypeNameEnum.DIRECT_PROGRAMMING_TEST]: ProgTestsActionEnum.UPDATE_MUTATION_LEVEL_3,
    },
    {
      [TypeNameEnum.DIRECT_PROGRAMMING]: ProgTestsActionEnum.DELETE_MUTATION_LEVEL_1,
      [TypeNameEnum.DIRECT_PROGRAMMING_CHARTER]: ProgTestsActionEnum.DELETE_MUTATION_LEVEL_2,
      [TypeNameEnum.DIRECT_PROGRAMMING_TEST]: ProgTestsActionEnum.DELETE_MUTATION_LEVEL_3,
    },
  ];

  if (deled) return mapSettings[2][typeName];

  return added ? mapSettings[0][typeName] : mapSettings[1][typeName];
};

export const ProgTestsActionCreators = {
  setData: (data: TestsDTO): SetDataAction => ({
    type: ProgTestsActionEnum.SET_DATA,
    payload: data,
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: ProgTestsActionEnum.SET_IS_LOADING,
    payload,
  }),
  setError: (payload: ErrorFetchApp): SetErrorAction => ({
    type: ProgTestsActionEnum.SET_ERROR,
    payload,
  }),
  resetExpiresProgTest: (): ResetExpiresAction => ({
    type: ProgTestsActionEnum.RESET_EXPIRES,
  }),
  query:
    (refetch = false) =>
    async (dispatch: AppDispatch, getState: GetState) => {
      try {
        if (!refetch) {
          const { expires } = getState().progTests;
          if (Date.now() < expires) return;
        }
        dispatch(ProgTestsActionCreators.setIsLoading(true));

        const { data } = await HttpClient.getAppAPI<TestsDTO>(TypeNameEnum.DIRECT_PROGRAMMING);

        dispatch(ProgTestsActionCreators.setData(data));
      } catch (e) {
        dispatch(ProgTestsActionCreators.setError(e as ErrorFetchApp));
        console.log(e);
      }
    },
  refetch: () => async (dispatch: AppDispatch) => {
    dispatch(ProgTestsActionCreators.query(true));
  },
  setMutation: <T>(props: T): T => props,
  mutationProgTest:
    <DTO>(props: CallbackSaveFieldCompleteData<DTO>) =>
    (dispatch: AppDispatch) => {
      const typeName = getTypeName(props.typeName);

      if (!typeName) throw new Error(`TypeName: ${props.typeName} не существует`);
      const payload = props.added
        ? { data: props.data, parentId: props.parentId }
        : {
            data: props.data,
            _id: props.data._id,
            parentId: props.parentId,
          };
      const type = getTypeActionByMutationPropsTypeName(typeName, props.added);
      if (!type) throw new Error(`TypeName: ${props.typeName} не существует`);

      dispatch(ProgTestsActionCreators.setMutation({ type, payload }));
    },
  mutationFieldProgTest:
    <DTO>(props: CallbackSaveFieldCompleteData<DTO>) =>
    (dispatch: AppDispatch) => {
      const typeName = getTypeName(props.typeName);
      if (!typeName) throw new Error(`TypeName: ${props.typeName} не существует`);

      const payload = {
        data: { [props.fieldName]: props.data[props.fieldName] },
        _id: props.data._id,
        parentId: props.parentId,
      };
      const type = getTypeActionByMutationPropsTypeName(typeName);
      if (!type) throw new Error(`TypeName: ${props.typeName} не существует`);

      dispatch(ProgTestsActionCreators.setMutation({ type, payload }));
    },
  mutationDeleteProgTest: (props: CallbackDeleteCompleteData) => (dispatch: AppDispatch) => {
    const typeName = getTypeName(props.typeName);
    if (!typeName) throw new Error(`TypeName: ${props.typeName} не существует`);

    const payload = { _id: props._id };
    const type = getTypeActionByMutationPropsTypeName(typeName, false, true);

    dispatch(ProgTestsActionCreators.setMutation({ type, payload }));
  },
};
