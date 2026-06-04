const todoService = require("../services/todoServices");
const response = require("../utils/response");
const message = require("../constants/message");

const createTodo = async (req, res) => {
  try {
    const todoData = req.body;
    const userId = req.user.userId;

    const newTodo = await todoService.createTodo(todoData, userId);
    return response.SucessResponse(res, 200, message.todoCreated, newTodo);
  } catch (error) {
    console.log("Errorrrr--=-=-=", error);
    return response.errorResponse(res, 500, error.message, null);
  }
};

const todoList = async (req, res) => {
  try {
    const userId = req.user.userId;
    const todoList = await todoService.todoList(userId);
    console.log("vvvvvvvv", todoList);
    return response.SucessResponse(res, 200, message.todoFetched, todoList);
  } catch (error) {
    console.log("Errrorrrrrr", error);
    return response.errorResponse(res, 500, error.message, null);
  }
};

const updateTodo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    console.log(id);
    console.log(userId);
    const todo = await todoService.updateTodo(id, userId, req.body);
    console.log(todo);
    if (!todo) {
      return response.failResponse(res, 404, message.todonotFound, null);
    }
    return response.SucessResponse(res, 200, message.updateTodo, todo);
  } catch (error) {
    console.log("Errrorrrrrr", error);
    return response.errorResponse(res, 500, error.message, null);
  }
};

const deletetodo = async(req,res)=>{
    try {
    const userId = req.user.userId;
    const { id } = req.params;
    console.log(id);
    console.log(userId);
    const todo = await todoService.deleteTodo(id, userId, req.body);
    console.log(todo);
    if (!todo) {
      return response.failResponse(res, 404, message.todonotFound, null);
    }
    return response.SucessResponse(res, 200, message.deleteTodo, todo);
  } catch (error) {
    console.log("Errrorrrrrr", error);
    return response.errorResponse(res, 500, error.message, null);
  }
}

module.exports = {
  createTodo,
  todoList,
  updateTodo,
  deletetodo
};
