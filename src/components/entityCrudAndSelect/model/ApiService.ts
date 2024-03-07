export interface IEntity {
  _id: string;
  name: string;
  [key: string]: string;
}
export interface IApiService<T extends IEntity> {
  getAll: () => Promise<T[]>;

  getOne: (id: string) => Promise<T>;

  create: (body: T) => Promise<T>;
  update: (body: T) => Promise<T>;

  deleteOne: (id: string) => Promise<void>;

  deleteMany: (body: { ids: string[] }) => Promise<void>;
}
