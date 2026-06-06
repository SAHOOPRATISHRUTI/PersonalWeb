const dailyinfoservice = require("../services/dailyinfoService");
const response = require("../utils/response");
const message = require("../constants/message");

const createDailyInfo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const dailyInfoData = req.body;
    const data = await dailyinfoservice.createDailyInfo(userId, dailyInfoData);
    response.SucessResponse(res,200, message.DAILYINFO_CREATED_SUCCESSFULLY, data);
  } catch (error) {
    console.log(error);
    response.errorResponse(res,500, error.message, null);
  }
};

const getDailyInfo = async(req,res)=>{
    try{

        const userId = req.user.userId;
        const {date} = req.query;
        console.log("date==", req.query.date);
        const data = await dailyinfoservice.getDailyInfo(userId,date);
        response.SucessResponse(res,200, message.dailyInfoFetcheddatewise, data);

    }catch(error){
        console.log(error);
        response.errorResponse(res,500, error.message, null);
    }
}


// const dailyInfoController = async

module.exports = {
  createDailyInfo,
  getDailyInfo,
};

