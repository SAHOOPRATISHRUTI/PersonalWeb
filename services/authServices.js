const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middleware/authmiddleware");
const activityService = require("./activityService");
const activityServicActions = require("../constants/activityActions");

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return true;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  await activityService.createActivity({
    userId: newUser._id,
    action: activityServicActions.REGISTER,
    module: "AUTH",
    description: `${newUser.email} registered successfully`,
  });

  return {
    success: true,
    data: newUser,
  };
};

const loginUser = async (Userdata) => {
  const { email, password } = Userdata;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return null;
  }
  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordMatch) {
    return null;
  }
  const accessToken = generateAccessToken(existingUser);
  const refreshToken = generateRefreshToken(existingUser);

  existingUser.refreshToken = refreshToken;
  await existingUser.save();

  await activityService.createActivity({
    userId: existingUser._id,
    action: activityServicActions.LOGIN,
    module: "AUTH",
    description: `${existingUser.email} logged in successfully`,
  });

  return {
    ...existingUser.toObject(),
    accessToken,
    refreshToken,
  };
};


const getProfile = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    return null;
  }

  return {
    success: true,
    data: user,
  };
};

module.exports = {
  registerUser,
  loginUser,
  getProfile
};
