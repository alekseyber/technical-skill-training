export interface DirectProgrammingTestDTO {
  _id: string;
  title: string;
  status: boolean;
  categoryId?: string;
}

export interface DirectProgramming–°hapterDTO {
  _id: string;
  title: string;
  status: boolean;
  childs: DirectProgrammingTestDTO[];
}

export interface DirectProgrammingDTO {
  _id: string;
  title: string;
  status: boolean;
  childs: DirectProgramming–°hapterDTO[];
}
export type TestsDTO = DirectProgrammingDTO[];
