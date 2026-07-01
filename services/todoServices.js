const todoModel = require("../models/todo");
const activitylogs = require("../services/activityService");
const activityServicActions = require("../constants/activityActions");
const User = require("../models/user");
const mongoose = require("mongoose");

// const createTodo = async (tododata, userId) => {
//   if (!userId) {
//     return (userIdnotfound = true);
//   }
//   const todo = await todoModel.create({
//     ...tododata,
//     userId,
//   });
//   const user = await User.findById(userId);
//   console.log("User Data Found ===", user);

//   await activitylogs.createActivity({
//     userId: userId,
//     action: activityServicActions.CREATE_TASK,
//     module: "TODO",
//     description: `${user.email} created a todo task`,
//   });

//   return {
//     data: todo,
//   };
// };
const createTodo = async (tododata, userId) => {
  if (!userId) {
    throw new Error("User not found");
  }

  const taskDateTime = new Date(tododata.date);

  if (tododata.scheduledTime) {
    const [hours, minutes] = tododata.scheduledTime.split(":").map(Number);

    taskDateTime.setHours(hours);
    taskDateTime.setMinutes(minutes);
    taskDateTime.setSeconds(0);
    taskDateTime.setMilliseconds(0);
  }

  const now = new Date();

  const isDelayed = taskDateTime <= now;

  const todo = await todoModel.create({
    ...tododata,
    userId,
    isDelayed,
    notificationSent: isDelayed, // optional
  });

  const user = await User.findById(userId);

  await activitylogs.createActivity({
    userId,
    action: activityServicActions.CREATE_TASK,
    module: "TODO",
    description: `${user.email} created a todo task`,
  });

  return todo;
};
const todoList = async (userId) => {
  console.log("userrrrrrrID=", userId);
  return await todoModel.find({ userId }).sort({ createdAt: -1 });
};

const todoListDate = async (userId, date) => {
  const startDate = new Date(date);

  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);
  const user = await User.findById(userId);
  if (!userId) {
    throw new Error("User not found");
  }

  return await todoModel
    .find({
      userId,
      isDeleted: false,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    })
    .sort({ scheduledTime: 1 });

  await activitylogs.createActivity({
    userId: userId,
    action: activityServicActions.DATE_TASK,
    module: "DAILY INFO",
    description: `${user.name} viewed todo for ${date}`,
  });
  // return todoModel;
};

// const updateTodo = async (todoId, userId, updateData) => {
//   const user = await User.findById(userId);

//   const updatePayload = {
//     ...updateData,
//     isEdited: true,
//     editedAt: new Date(),
//   };

//   // Handle completedAt automatically
//   if (updateData.status === "COMPLETED") {
//     updatePayload.completedAt = new Date();
//   } else if (updateData.status === "PENDING") {
//     updatePayload.completedAt = null;
//   }

//   const todo = await todoModel.findOneAndUpdate(
//     {
//       _id: todoId,
//       userId,
//       isDeleted: false,
//     },
//     updatePayload,
//     {
//       new: true,
//     },
//   );

//   await activitylogs.createActivity({
//     userId,
//     action: activityServicActions.UPDATE_TASK,
//     module: "TODO",
//     description: `${user.email} updated a todo task`,
//   });

//   return todo;
// };
// const updateTodo = async (todoId, userId, updateData) => {
//   const user = await User.findById(userId);

//   const updatePayload = {
//     ...updateData,
//     isEdited: true,
//     editedAt: new Date(),
//   };

//   // Handle completed status
//   if (updateData.status === "COMPLETED") {
//     updatePayload.completedAt = new Date();
//   } else if (updateData.status === "PENDING") {
//     updatePayload.completedAt = null;
//   }

//   // Handle delay reason
//   if (updateData.delayReason && updateData.delayReason.trim() !== "") {
//     const reason = updateData.delayReason.trim();

//     updatePayload.delayReason = reason;

//     // 🟢 ADD THIS (important)
//     updatePayload.delayReasonSubmittedAt = new Date();

//     // Reset delayed flags after reason is provided
//     updatePayload.isDelayed = false;
//     updatePayload.notificationSent = false;
//   }

//   const todo = await todoModel.findOneAndUpdate(
//     {
//       _id: todoId,
//       userId,
//       isDeleted: false,
//     },
//     updatePayload,
//     {
//       new: true,
//     },
//   );

//   await activitylogs.createActivity({
//     userId,
//     action: activityServicActions.UPDATE_TASK,
//     module: "TODO",
//     description: `${user.email} updated a todo task`,
//   });

//   return todo;
// };

const updateTodo = async (todoId, userId, updateData) => {
  const user = await User.findById(userId);

  // Get existing todo
  const existingTodo = await todoModel.findOne({
    _id: todoId,
    userId,
    isDeleted: false,
  });

  if (!existingTodo) {
    throw new Error("Todo not found");
  }

  const updatePayload = {
    ...updateData,
    isEdited: true,
    editedAt: new Date(),
  };

  // Handle completed status
  if (updateData.status === "COMPLETED") {
    updatePayload.completedAt = new Date();
  } else if (updateData.status === "PENDING") {
    updatePayload.completedAt = null;
  }

  // Handle delay reason
  if (updateData.delayReason?.trim()) {
    updatePayload.delayReason = updateData.delayReason.trim();
    updatePayload.isDelayed = true;
    updatePayload.notificationSent = true;

    // Set only once
    if (!existingTodo.delayReasonSubmittedAt) {
      updatePayload.delayReasonSubmittedAt = new Date();
    }
  }

  const todo = await todoModel.findOneAndUpdate(
    {
      _id: todoId,
      userId,
      isDeleted: false,
    },
    updatePayload,
    {
      new: true,
    },
  );

  await activitylogs.createActivity({
    userId,
    action: activityServicActions.UPDATE_TASK,
    module: "TODO",
    description: `${user.email} updated a todo task`,
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

const todoCountByDate = async (userId) => {
  if (!userId) {
    throw new Error("User not found");
  }

  return await todoModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$date",
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        count: 1,
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
  ]);
};

module.exports = {
  createTodo,
  todoListDate,
  updateTodo,
  deleteTodo,
  todoList,
  todoCountByDate,
};
