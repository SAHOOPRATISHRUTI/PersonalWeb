const dailyinfoservice = require("../services/dailyinfoService");
const response = require("../utils/response");
const message = require("../constants/message");

const createDailyInfo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const dailyInfoData = req.body;
    const data = await dailyinfoservice.createDailyInfo(userId, dailyInfoData);
    response.SucessResponse(
      res,
      200,
      message.DAILYINFO_CREATED_SUCCESSFULLY,
      data,
    );
  } catch (error) {
    console.log(error);
    response.errorResponse(res, 500, error.message, null);
  }
};

const getDailyInfo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { date } = req.query;
    console.log("date==", req.query.date);
    const data = await dailyinfoservice.getDailyInfo(userId, date);
    response.SucessResponse(res, 200, message.dailyInfoFetcheddatewise, data);
  } catch (error) {
    console.log(error);
    response.errorResponse(res, 500, error.message, null);
  }
};

const updateDailyInfo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const dailyInfoId = req.params.dailyInfoId;

    const updatedata = req.body;

    const data = await dailyinfoservice.updateDailyInfo(
      userId,
      dailyInfoId,
      updatedata,
    );
    response.SucessResponse(
      res,
      200,
      message.updateDailyInfoSuccess,
      data,
    );
  } catch (error) {
    console.log(error);
    response.errorResponse(res, 500, error.message, null);
  }
};
const deleteDailyInfo = async(req,res)=>{
  try{
    const userId = req.user.userId;
    const dailyInfoId = req.params.dailyInfoId;
    const data = await dailyinfoservice.deleteDailyInfo(userId, dailyInfoId);
    response.SucessResponse(
      res,
      200,
      message.deleteDailyInfoSuccess,
      data,
    );

  }catch(error){
    console.log(error);
    response.errorResponse(res, 500, error.message, null);
}
}

module.exports = {
  createDailyInfo,
  getDailyInfo,
  updateDailyInfo,
  deleteDailyInfo
};
