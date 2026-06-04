const todoController = require("../controller/todoController");
const middleware = require("../middleware/authmiddleware");
const route = require("express").Router();

route.post("/create", middleware.verifyAccessToken, todoController.createTodo);
route.get("/todo-list", middleware.verifyAccessToken, todoController.todoList);
route.put("/:id", middleware.verifyAccessToken, todoController.updateTodo);
route.delete("/:id", middleware.verifyAccessToken, todoController.deletetodo);
module.exports = route;
