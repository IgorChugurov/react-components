import { dbPromise } from "./db";
export interface IEntity {
  _id: string;
  name: string;
  [key: string]: string;
}
export class ApiService<T extends IEntity> {
  constructor(private storeName: string) {}

  getAll = async (): Promise<T[]> => {
    const db = await dbPromise;
    //console.log(this.storeName, db);
    return db.getAll(this.storeName);
  };

  getOne = async (id: string): Promise<T> => {
    const db = await dbPromise;
    return db.get(this.storeName, id);
  };

  create = async (body: T): Promise<T> => {
    const db = await dbPromise;
    body._id = Date.now() + "_entity";
    await db.add(this.storeName, body);
    return body;
  };

  update = async (item: T): Promise<T> => {
    const db = await dbPromise;

    const tx = db.transaction(this.storeName, "readwrite");
    const store = tx.objectStore(this.storeName);

    // Получаем текущую запись
    const record = await store.get(item._id);

    if (!record) {
      throw new Error("Запись не найдена");
    }

    // Обновляем поля записи
    const updatedRecord = { ...record, ...item };

    // Сохраняем обновленную запись
    await store.put(updatedRecord);

    await tx.done; // Дожидаемся завершения транзакции
    return updatedRecord;
  };

  deleteOne = async (id: string): Promise<void> => {
    const db = await dbPromise;
    return db.delete(this.storeName, id);
  };

  deleteMany = async (body: { ids: string[] }): Promise<void> => {
    const db = await dbPromise;
    //return db.delete(this.storeName,);
  };
}
export const fileTypeService = new ApiService<IEntity>("file-type");
export const categoryService = new ApiService<IEntity>("categories");
