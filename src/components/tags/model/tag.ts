export interface ITag {
  id?: string;
  _id: string;
  name: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface ITagsDataService {
  deleteManyTags: (d: any) => Promise<any>;
  deleteOneTag: (d: string) => Promise<any>;
  updagteOneTag: (d: any) => Promise<ITag>;
  createOneTag: (d: any) => Promise<ITag>;
  getOneTag: (d: string) => Promise<ITag>;
  getAllTags: () => Promise<ITag[]>;
}
