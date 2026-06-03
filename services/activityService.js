const ActivityLog = require("../models/activityLog");

const createActivity = async (userId, action, module, description) => {
  return await ActivityLog.create({
    userId,
    action,
    module,
    description,
  });
};

const getActivityLogs = async (userId) => {
  return await ActivityLog.find({ userId }).sort({ createdAt: -1 });
};

module.exports = {
  createActivity,
  getActivityLogs,
};
