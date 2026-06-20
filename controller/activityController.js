const activityService = require("../services/activityService");
const Response = require("../utils/response");
const message = require("../constants/message");

const getActivities = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const activities = await activityService.getActivityLogs(userId);
    return Response.SucessResponse(res, 200, message.fetchedActivities, activities);
  }
  catch(error){
    console.log("Error==", error);
    return Response.errorResponse(res, 500, message.errorFetchingActivities, null);
  }
}

module.exports = {
    getActivities
}