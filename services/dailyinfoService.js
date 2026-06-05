const dailyInfoModel = require("../models/dailyInfo")
const activitylogs = require("./activityService")
const acticityServicActions = require("../constants/activityActions")
const User = require("../models/user")

const createDailyInfo = async(userId,dailyInfodata)=>{
    if(!userId){
        return userIdnotFound = true;
    }
    const user = await Use.user.findById(userId);
    const dailyInfo = await dailyInfoModel.create({
        userId,
        ...dailyInfodata
    })

    await activitylogs.createActivity({
        userId:userId,
        action:acticityServicActions.CREATE_DAILYINFO,
        module:"DAILY INFO",
    description: `${user.name} created a new daily info`,

    })
}

module.exports={
    createDailyInfo
}