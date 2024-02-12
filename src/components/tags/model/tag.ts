import { IListResponse } from "../../../service/request";

export interface ITag {
  id?: string;
  _id: string;
  name: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface ITagsDataService {
  deleteManyTags: (d?: any) => any;
  deleteOneTag: (d?: any) => any;
  updagteOneTag: (d?: any) => any;
  createOneTag: <T, V>(d?: T) => Promise<V>;
  getOneTag: (d?: any) => any;
  getAllTags: (d?: any) => Promise<IListResponse<ITag>>;
}
