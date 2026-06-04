const todoModel = require("../models/todo");
const activitylogs = require("../services/activityService");
const activityServicActions = require("../constants/activityActions");
const User = require("../models/user");

const createTodo = async (tododata, userId) => {
  if (!userId) {
    return (userIdnotfound = true);
  }
  const todo = await todoModel.create({
    ...tododata,
    userId,
  });
  const user = await User.findById(userId);
  console.log("User Data Found ===", user);

  await activitylogs.createActivity({
    userId: userId,
    action: activityServicActions.CREATE_TASK,
    module: "TODO",
    description: `${user.email} created a todo task`,
  });

  return {
    data: todo,
  };
};

const todoList = async (userId) => {
  console.log("userrrrrrrID=", userId);
  return await todoModel.find({ userId }).sort({ createdAt: -1 });
};

const updateTodo = async (todoId, userId, updateData) => {
  console.log(todoId, userId, updateData);
  const user = await User.findById(userId);
  const todo = await todoModel.findOneAndUpdate(
    {
      _id: todoId,
      userId,
      isDeleted: false,
    },
    {
      ...updateData,
      isEdited: true,
      editedAt: new Date(),
    },
    {
      new: true,
    },
  );
  await activitylogs.createActivity({
    userId: userId,
    action: activityServicActions.UPDATE_TASK,
    module: "TODO",
    description: `${user.email} update a todo task`,
  });

  return todo;
};

const deleteTodo = async (todoId, userId) => {
  const user = await User.findById(userId);
  const todo = await todoModel.findByIdAndUpdate(
    {
      _id: todoId,
      userId,
      isDeleted: false,
    },

    {
      isDeleted: true,
      deletedAt: new Date(),
    },
    {
      new: true,
    },
  );
  await activitylogs.createActivity({
    userId: userId,
    action: activityServicActions.DELETE_TASK,
    module: "TODO",
    description: `${user.email} delete a todo task`,
  });
  return todo;
};

module.exports = {
  createTodo,
  todoList,
  updateTodo,
  deleteTodo,
};
