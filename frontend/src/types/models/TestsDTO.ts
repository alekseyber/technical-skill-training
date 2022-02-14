export interface DirectProgrammingTestDTO {
  _id: string;
  title: string;
  status: boolean;
  categoryId?: string;
}

export interface DirectProgrammingСhapterDTO {
  _id: string;
  title: string;
  status: boolean;
  childs: DirectProgrammingTestDTO[];
}

export interface DirectProgrammingDTO {
  _id: string;
  title: string;
  status: boolean;
  childs: DirectProgrammingСhapterDTO[];
}
export type TestsDTO = DirectProgrammingDTO[];
