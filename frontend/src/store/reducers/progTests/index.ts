import { ProgTestsState, ProgTestsActionEnum, ProgTestsAction } from "./types";
import type { TestsDTO } from "@src/types/models";
import { getCashTime } from "@src/utils/getCashTime";

const initialState: ProgTestsState = {
  loading: false,
  data: <TestsDTO>[],
  error: null,
  expires: 0,
};

export default function authReducer(
  state = initialState,
  action: ProgTestsAction
): ProgTestsState {
  switch (action.type) {
    case ProgTestsActionEnum.SET_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        expires: getCashTime(),
      };
    case ProgTestsActionEnum.SET_IS_LOADING:
      return { ...state, loading: action.payload, error: null };
    case ProgTestsActionEnum.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ProgTestsActionEnum.ADD_MUTATION_LEVEL_1:
      return {
        ...state,
        data: [...state.data, action.payload.data],
      };
    case ProgTestsActionEnum.UPDATE_MUTATION_LEVEL_1:
      return {
        ...state,
        data: state.data.map((level1) =>
          action.payload._id === level1._id
            ? { ...level1, ...action.payload.data }
            : level1
        ),
      };
    case ProgTestsActionEnum.DELETE_MUTATION_LEVEL_1:
      return {
        ...state,
        data: state.data.filter((level1) => action.payload._id !== level1._id),
      };
    case ProgTestsActionEnum.ADD_MUTATION_LEVEL_2:
      return {
        ...state,
        data: state.data.map((level1) => ({
          ...level1,
          childs:
            action.payload.parentId === level1._id
              ? [...level1.childs, action.payload.data]
              : level1.childs,
        })),
      };
    case ProgTestsActionEnum.UPDATE_MUTATION_LEVEL_2:
      return {
        ...state,
        data: state.data.map((level1) => ({
          ...level1,
          childs: level1.childs.map((level2) =>
            action.payload._id === level2._id &&
            action.payload.parentId === level1._id
              ? { ...level2, ...action.payload.data }
              : level2
          ),
        })),
      };
    case ProgTestsActionEnum.DELETE_MUTATION_LEVEL_2:
      return {
        ...state,
        data: state.data.map((level1) => ({
          ...level1,
          childs: level1.childs.filter(
            (level2) => action.payload._id !== level2._id
          ),
        })),
      };
    case ProgTestsActionEnum.ADD_MUTATION_LEVEL_3:
      return {
        ...state,
        data: state.data.map((level1) => ({
          ...level1,
          childs: level1.childs.map((level2) => ({
            ...level2,
            childs:
              action.payload.parentId === level2._id
                ? [...level2.childs, action.payload.data]
                : level2.childs,
          })),
        })),
      };
    case ProgTestsActionEnum.UPDATE_MUTATION_LEVEL_3:
      return {
        ...state,
        data: state.data.map((level1) => ({
          ...level1,
          childs: level1.childs.map((level2) => ({
            ...level2,
            childs: level2.childs.map((level3) =>
              action.payload._id === level3._id &&
              action.payload.parentId === level2._id
                ? { ...level3, ...action.payload.data }
                : level3
            ),
          })),
        })),
      };
    case ProgTestsActionEnum.DELETE_MUTATION_LEVEL_3:
      return {
        ...state,
        data: state.data.map((level1) => ({
          ...level1,
          childs: level1.childs.map((level2) => ({
            ...level2,
            childs: level2.childs.filter(
              (level3) => action.payload._id !== level3._id
            ),
          })),
        })),
      };
    case ProgTestsActionEnum.RESET_EXPIRES:
      return {
        ...state,
        expires: 0,
      };

    default:
      return state;
  }
}
