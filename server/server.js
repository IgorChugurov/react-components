const jsonServer = require("json-server");
const { v4: uuidv4 } = require("uuid");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Адаптируйте путь к вашему файлу с данными
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

// Получение всех тегов
server.get("/api/tags", (req, res) => {
  const tags = router.db.get("tags").value();
  res.jsonp(tags);
});

// Получение одного тега по ID
server.get("/api/tags/:id", (req, res) => {
  const tag = router.db.get("tags").find({ _id: req.params.id }).value();
  res.jsonp(tag || {});
});

// Создание нового тега
server.post("/api/tags", (req, res) => {
  const newTag = { ...req.body, _id: uuidv4() }; // Добавляем уникальный _id к новому тегу
  const result = router.db.get("tags").push(newTag).write();
  res.status(201).jsonp(result);
});

// Обновление тега
server.put("/api/tags/:id", (req, res) => {
  const updatedTag = router.db
    .get("tags")
    .find({ _id: req.params.id })
    .assign(req.body)
    .write();
  res.jsonp(updatedTag);
});

// Удаление тега
server.delete("/api/tags/:id", (req, res) => {
  router.db.get("tags").remove({ _id: req.params.id }).write();
  res.sendStatus(204);
});

// Удаление нескольких тегов
server.put("/api/tags/delete-many", (req, res) => {
  const { ids } = req.body;
  ids.forEach((id) => {
    router.db.get("tags").remove({ _id: id }).write();
  });
  res.sendStatus(200);
});

// Используйте router
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
