import { openDB, deleteDB, wrap, unwrap } from "idb";

export const dbPromise = openDB("my-database", 3, {
  upgrade(db, oldVersion, newVersion, transaction) {
    switch (oldVersion) {
      case 0:
        // Если база данных создается с нуля, сюда можно добавить код создания первоначальных хранилищ объектов
        // Создание хранилища объектов для тегов, если оно еще не существует
        if (!db.objectStoreNames.contains("tags")) {
          db.createObjectStore("tags", { keyPath: "_id" });
        }
        // Создание хранилища объектов для записей, если оно еще не существует
        if (!db.objectStoreNames.contains("records")) {
          db.createObjectStore("records", { keyPath: "_id" });
        }
        if (!db.objectStoreNames.contains("entity")) {
          db.createObjectStore("entity", { keyPath: "_id" });
        }
        if (!db.objectStoreNames.contains("category")) {
          db.createObjectStore("category", { keyPath: "_id" });
        }
        if (!db.objectStoreNames.contains("file-type")) {
          db.createObjectStore("file-type", { keyPath: "_id" });
        }
        break;

      case 1:
        // Этот код выполнится для обновления с версии 1 до 2
        if (!db.objectStoreNames.contains("category")) {
          db.createObjectStore("category", { keyPath: "_id" });
        }
        if (!db.objectStoreNames.contains("file-type")) {
          db.createObjectStore("file-type", { keyPath: "_id" });
        }
        break;
      case 2:
        // Этот код выполнится для обновления с версии 1 до 2
        if (!db.objectStoreNames.contains("categories")) {
          db.createObjectStore("categories", { keyPath: "_id" });
        }
        if (!db.objectStoreNames.contains("file-type")) {
          db.createObjectStore("file-type", { keyPath: "_id" });
        }
        break;
      // Здесь можно добавить break, если не требуется падение до следующего case
      // Можно добавить дополнительные case для будущих обновлений
    }
  },
});
