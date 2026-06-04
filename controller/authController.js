const registerService = require("../services/authServices");
const Response = require("../utils/response");
const message = require("../constants/message");

const registerUser = async (req, res) => {
  try {
    const UserData = req.body;
    const newUser = await registerService.registerUser(UserData);
    console.log("newUser==", newUser);
    if (newUser === true) {
      return Response.failResponse(res, 409, message.alreadyExist, null);
    }

    return Response.SucessResponse(res, 200, message.userCreated, newUser);
  } catch (error) {
    console.log("Error==", error);
    return Response.errorResponse(res, 500, error.message, null);
  }
};

const loginUser = async (req, res) => {
  try {
    const Userdata = req.body;

    console.log("Userdata==", Userdata);

    const loggedinUser = await registerService.loginUser(Userdata);

    console.log("loggedinUser==", loggedinUser);

    if (!loggedinUser) {
      return Response.failResponse(res, 401, message.invalidCredentials, null);
    }

    return Response.SucessResponse(
      res,
      200,
      message.userLoggedIn,
      loggedinUser,
    );
  } catch (error) {
    console.log("Error==", error);

    return Response.errorResponse(res, 500, message.errorLoggingIn, null);
  }
};

const getProfile = async(req,res)=>{
  try{
    const userId = req.user.userId;

    const user = await registerService.getProfile(userId);

    if (!user) {
      return Response.failResponse(res, 404, message.userNotFound, null);
    }

    return Response.SucessResponse(res, 200, message.fetchedProfile, user);
  } catch (error) {
    console.log("Error==", error);
    return Response.errorResponse(res, 500, error.message, null);
  }
}






module.exports = {
  registerUser,
  loginUser,
  getProfile
};
