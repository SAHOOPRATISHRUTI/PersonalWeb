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
    return Response.errorResponse(res, 500, message.errorCreatingUser, null);
  }
};

const loginUser = async (req, res) => {
  try {
    const Userdata = req.body;
console.log("Userdata==", Userdata);
    const loggedinUser = await registerService.loginUser(Userdata);

    console.log("loggedinUser==", loggedinUser);

    return Response.SucessResponse(
      res,
      200,
      message.userLoggedIn,
      loggedinUser,
    );

    if (!loggedinUser.success) {
      return Response.failResponse(
        res,
        401,
        loggedinUser.message || message.invalidCredentials,
        null,
      );
    }
  } catch (error) {
    console.log("Error==", error);

    return Response.errorResponse(res, 500, message.errorLoggingIn, null);
  }
};
module.exports = {
  registerUser,
  loginUser,
};
