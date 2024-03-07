import { dbPromise } from "./db";
const storeName = "entity";

export const entityService = {
  async getAll() {
    const db = await dbPromise;
    return db.getAll(storeName);
  },

  async getOne(id: string) {
    const db = await dbPromise;
    return db.get(storeName, id);
  },

  async create(item: any) {
    const db = await dbPromise;
    item._id = Date.now() + "_entity";
    return db.add(storeName, item);
  },

  async update(item: any) {
    const db = await dbPromise;

    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

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
  },

  async delete(id: string) {
    const db = await dbPromise;
    return db.delete(storeName, id);
  },
};
