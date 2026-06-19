const dailyInfoModel = require("../models/dailyInfo");
const activitylogs = require("./activityService");
const acticityServicActions = require("../constants/activityActions");
const User = require("../models/user");

const createDailyInfo = async (userId, dailyInfodata) => {
  if (!userId) {
    return (userIdnotFound = true);
  }

  const user = await User.findById(userId);

  // Check if daily info already exists for the same date
  const startDate = new Date(dailyInfodata.date);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(dailyInfodata.date);
  endDate.setHours(23, 59, 59, 999);

  const existingDailyInfo = await dailyInfoModel.findOne({
    userId,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
    isDeleted: false,
  });

  if (existingDailyInfo) {
    throw new Error("Daily Info already exists for this date");
  }
  const dailyInfo = await dailyInfoModel.create({
    userId,
    ...dailyInfodata,
  });

  await activitylogs.createActivity({
    userId,
    action: acticityServicActions.CREATE_DAILYINFO,
    module: "DAILY INFO",
    description: `${user.name} created a new daily info`,
  });

  return dailyInfo;
};

const getDailyInfo = async (userId, date) => {
  const startDate = new Date(date);

  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);
  if (!userId) {
    return (userIdnotFound = true);
  }
  const user = await User.findById(userId);
  const dailyInfo = await dailyInfoModel.find({
    userId,
    isDeleted: false,
    date: {
      $gte: startDate,
      $lt: endDate,
    },
  });
  await activitylogs.createActivity({
    userId: userId,
    action: acticityServicActions.DATE_DAILYINFO,
    module: "DAILY INFO",
    description: `${user.name} viewed daily info for ${date}`,
  });
  return dailyInfo;
};

const updateDailyInfo = async (userId, dailyInfoId, updateData) => {
  if (!userId) {
    throw new Error("User not found");
  }

  const user = await User.findById(userId);

  if (updateData.date) {
    const startDate = new Date(updateData.date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(updateData.date);
    endDate.setHours(23, 59, 59, 999);

    const existingDailyInfo = await dailyInfoModel.findOne({
      userId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
      _id: { $ne: dailyInfoId },
    });

    if (existingDailyInfo) {
      throw new Error(
        "Daily Info already exists for this date. Please choose another date.",
      );
    }
  }

  const dailyInfo = await dailyInfoModel.findOneAndUpdate(
    {
      _id: dailyInfoId,
      userId,
    },
    updateData,
    { new: true },
  );

  if (!dailyInfo) {
    throw new Error("Daily Info not found");
  }

  await activitylogs.createActivity({
    userId,
    action: acticityServicActions.UPDATE_DAILYINFO,
    module: "DAILY INFO",
    description: `${user.name} updated daily info for ${dailyInfo.date}`,
  });

  return [dailyInfo]; // if frontend expects array
};

const deleteDailyInfo = async (userId, dailyInfoId) => {
  const user = await User.findById(userId);
  const dailyInfo = await dailyInfoModel.findOneAndUpdate(
    {
      isDeleted: false,
      _id: dailyInfoId,
      userId,
    },
    { isDeleted: true },
    { new: true },
  );
  await activitylogs.createActivity({
    userId: userId,
    action: acticityServicActions.DELETE_DAILYINFO,
    module: "DAILY INFO",
    description: `${user.name} deleted daily info for ${dailyInfo.date}`,
  });
  return dailyInfo;
};

module.exports = {
  createDailyInfo,
  getDailyInfo,
  updateDailyInfo,
  deleteDailyInfo,
};
