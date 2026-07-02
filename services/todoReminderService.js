const Todo = require("../models/todo");
const User = require("../models/user");
const emailService = require("./emailService");
const transporter = require("../config/mailConfig");

const checkDelayedTasks = async () => {
  const now = new Date();

  console.log("====================================");
  console.log("UTC Time =", now);

  console.log(
    "IST Time =",
    now.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    }),
  );
  console.log("====================================");

  const allTodos = await Todo.find({});

  console.log("Total Todos In DB =", allTodos.length);

  allTodos.forEach((todo) => {
    console.log({
      id: todo._id,
      title: todo.title,
      status: todo.status,
      isDeleted: todo.isDeleted,
      notificationSent: todo.notificationSent,
      scheduledTime: todo.scheduledTime,
      date: todo.date,
    });
  });

  const todos = await Todo.find({
    status: "PENDING",
    isDeleted: false,
  });

  console.log("Pending Todos Found =", todos.length);

  const delayedTasks = [];

  for (const todo of todos) {
    console.log("\n====================================");
    console.log("Todo ID =", todo._id);
    console.log("Title =", todo.title);
    console.log("Date =", todo.date);
    console.log("Scheduled Time =", todo.scheduledTime);

    if (!todo.scheduledTime) {
      console.log("No scheduledTime found");
      continue;
    }

    const taskDateTime = new Date(todo.date);

    const [hours, minutes] = todo.scheduledTime.split(":").map(Number);

    taskDateTime.setHours(hours);
    taskDateTime.setMinutes(minutes);
    taskDateTime.setSeconds(0);
    taskDateTime.setMilliseconds(0);

    console.log("Task DateTime =", taskDateTime);

    console.log(
      "Task DateTime IST =",
      taskDateTime.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
    );

    console.log("Current DateTime =", now);

    const isDelayed = taskDateTime.getTime() <= now.getTime();

    console.log("Is Delayed =", isDelayed);

    if (isDelayed && !todo.notificationSent) {
      console.log("Delayed Task Found");
      console.log({
        isDelayed,
        notificationSent: todo.notificationSent,
      });
      const user = await User.findById(todo.userId);

      // Send Email
      if (user?.email) {
        try {
          console.log("email", user.email);
          console.log("title", todo.title);
          console.log("scheduledTime", todo.scheduledTime);

          await emailService.sendDelayTaskEmail(
            user.email,
            todo.title,
            todo.scheduledTime,
          );

          console.log("✅ Email Sent to:", user.email);
        } catch (err) {
          console.log("❌ Email Error:", err.message);
          console.log({
            code: err.code,
            command: err.command,
            response: err.response,
            responseCode: err.responseCode,
            message: err.message,
          });
        }
      }

      // Update Todo
      await Todo.findByIdAndUpdate(todo._id, {
        isDelayed: true,
        notificationSent: true,
      });

      delayedTasks.push({
        todoId: todo._id,
        title: todo.title,
        scheduledTime: todo.scheduledTime,
        email: user?.email,
      });
    }
  }

  console.log("\n====================================");
  console.log("Delayed Tasks =", delayedTasks);
  console.log("====================================");

  return delayedTasks;
};

module.exports = {
  checkDelayedTasks,
};
