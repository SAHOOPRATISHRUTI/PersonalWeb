const dailyInfoModel = require("../models/dailyInfo");
const activitylogs = require("./activityService");
const acticityServicActions = require("../constants/activityActions");
const User = require("../models/user");

const createDailyInfo = async (userId, dailyInfodata) => {
  if (!userId) {
    return (userIdnotFound = true);
  }

  const user = await User.findById(userId);
  const dailyInfo = await dailyInfoModel.create({
    userId,
    ...dailyInfodata,
  });

  await activitylogs.createActivity({
    userId: userId,
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
    if(!userId){
        return (userIdnotFound = true);
    }
    const user = await User.findById(userId);

    const dailyInfo=await dailyInfoModel.findOneAndUpdate(
        {
            _id:dailyInfoId,
            userId
        },
        updateData,
        { new: true }
    )

    await activitylogs.createActivity({
        userId: userId,
        action: acticityServicActions.UPDATE_DAILYINFO,
        module: "DAILY INFO",
        description: `${user.name} updated daily info for ${dailyInfo.date}`,
      });
      return dailyInfo;
}

module.exports = {
  createDailyInfo,
  getDailyInfo,
  updateDailyInfo,
};
