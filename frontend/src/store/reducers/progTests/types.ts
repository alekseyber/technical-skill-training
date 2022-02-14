import type {
  TestsDTO,
  DirectProgrammingDTO,
  DirectProgrammingСhapterDTO,
  DirectProgrammingTestDTO,
  TypeNameEnum,
} from "@src/types/models";
import { ErrorFetchApp } from "@src/types";

export interface ProgTestsState {
  loading: boolean;
  error: ErrorFetchApp | null;
  data: TestsDTO;
  expires: number;
}

export enum ProgTestsActionEnum {
  SET_DATA = "SET_DATA_PROG_TESTS",
  SET_IS_LOADING = "SET_IS_LOADING_PROG_TESTS",
  SET_ERROR = "SET_ERROR_PROG_TESTS",
  ADD_MUTATION_LEVEL_1 = "ADD_MUTATION_LEVEL_1",
  ADD_MUTATION_LEVEL_2 = "ADD_MUTATION_LEVEL_2",
  ADD_MUTATION_LEVEL_3 = "ADD_MUTATION_LEVEL_3",
  UPDATE_MUTATION_LEVEL_1 = "UPDATE_MUTATION_LEVEL_1",
  UPDATE_MUTATION_LEVEL_2 = "UPDATE_MUTATION_LEVEL_2",
  UPDATE_MUTATION_LEVEL_3 = "UPDATE_MUTATION_LEVEL_3",
  DELETE_MUTATION_LEVEL_1 = "DELETE_MUTATION_LEVEL_1",
  DELETE_MUTATION_LEVEL_2 = "DELETE_MUTATION_LEVEL_2",
  DELETE_MUTATION_LEVEL_3 = "DELETE_MUTATION_LEVEL_3",
  RESET_EXPIRES = "RESET_EXPIRES",
}

export interface SetDataAction {
  type: ProgTestsActionEnum.SET_DATA;
  payload: TestsDTO;
}

export interface SetErrorAction {
  type: ProgTestsActionEnum.SET_ERROR;
  payload: ErrorFetchApp;
}
export interface SetIsLoadingAction {
  type: ProgTestsActionEnum.SET_IS_LOADING;
  payload: boolean;
}

interface UpdateMutationBaseAction<DTO> {
  payload: {
    data: Partial<DTO>;
    _id: string;
    parentId?: string;
  };
}

interface AddMutationBaseAction<DTO> {
  payload: {
    data: DTO;
    parentId?: string;
  };
}

interface DeleteMutationBaseAction {
  payload: {
    _id: string;
  };
}

export interface AddMutationL1Action
  extends AddMutationBaseAction<DirectProgrammingDTO> {
  type: ProgTestsActionEnum.ADD_MUTATION_LEVEL_1;
}

export interface UpdateMutationL1Action
  extends UpdateMutationBaseAction<DirectProgrammingDTO> {
  type: ProgTestsActionEnum.UPDATE_MUTATION_LEVEL_1;
}

export interface DeleteMutationL1Action extends DeleteMutationBaseAction {
  type: ProgTestsActionEnum.DELETE_MUTATION_LEVEL_1;
}

export interface AddMutationL2Action
  extends AddMutationBaseAction<DirectProgrammingСhapterDTO> {
  type: ProgTestsActionEnum.ADD_MUTATION_LEVEL_2;
}

export interface UpdateMutationL2Action
  extends UpdateMutationBaseAction<DirectProgrammingСhapterDTO> {
  type: ProgTestsActionEnum.UPDATE_MUTATION_LEVEL_2;
}

export interface DeleteMutationL2Action extends DeleteMutationBaseAction {
  type: ProgTestsActionEnum.DELETE_MUTATION_LEVEL_2;
}

export interface AddMutationL3Action
  extends AddMutationBaseAction<DirectProgrammingTestDTO> {
  type: ProgTestsActionEnum.ADD_MUTATION_LEVEL_3;
}

export interface UpdateMutationL3Action
  extends UpdateMutationBaseAction<DirectProgrammingTestDTO> {
  type: ProgTestsActionEnum.UPDATE_MUTATION_LEVEL_3;
}

export interface DeleteMutationL3Action extends DeleteMutationBaseAction {
  type: ProgTestsActionEnum.DELETE_MUTATION_LEVEL_3;
}

export type TypeNameMutationUnion =
  | TypeNameEnum.DIRECT_PROGRAMMING
  | TypeNameEnum.DIRECT_PROGRAMMING_CHARTER
  | TypeNameEnum.DIRECT_PROGRAMMING_TEST;

export interface ResetExpiresAction {
  type: ProgTestsActionEnum.RESET_EXPIRES;
}

export type ProgTestsAction =
  | SetDataAction
  | SetIsLoadingAction
  | SetErrorAction
  | AddMutationL1Action
  | UpdateMutationL1Action
  | DeleteMutationL1Action
  | AddMutationL2Action
  | UpdateMutationL2Action
  | DeleteMutationL2Action
  | AddMutationL3Action
  | UpdateMutationL3Action
  | DeleteMutationL3Action
  | ResetExpiresAction;
