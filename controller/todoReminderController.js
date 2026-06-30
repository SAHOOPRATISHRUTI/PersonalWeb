const todoReminderService = require("../services/todoReminderService");
const response = require("../utils/response");
const message = require("../constants/message");

const checkDelayedTasks = async (req, res) => {
  try {
    const delayedTasks =
      await todoReminderService.checkDelayedTasks();

    return response.SucessResponse(
      res,
      200,
      message.delayedTasks,
      delayedTasks
    );
  } catch (error) {
    console.error("checkDelayedTasks Controller Error:", error);

    return response.errorResponse(
      res,
      500,
      error.message,
      null
    );
  }
};

module.exports = {
  checkDelayedTasks,
};