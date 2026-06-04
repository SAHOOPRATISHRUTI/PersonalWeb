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
  const activityLog = await activityService.createActivity({
    userId: newUser._id,
    action: activityServicActions.REGISTER,
    module: "AUTH",
    description: `${newUser.email} registered successfully`,
  });
  activityLog.save();
  console.log("New user created:", newUser);
  return {
    success: true,
    data: newUser,
  };
};
const loginUser = async (Userdata) => {
  const { email, password } = Userdata;
  console.log("Login attempt for email:", email);
  const existingUser = await User.findOne({ email });
  console.log("Existing user:", existingUser);

  if (!existingUser) {
    return null;
  }

  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordMatch) {
    return true;
  }

  const accessToken = generateAccessToken(existingUser);
  const refreshToken = generateRefreshToken(existingUser);

  existingUser.refreshToken = refreshToken;
  await existingUser.save();

  console.log("Creating activity log...");
  await activityService.createActivity({
    userId: existingUser._id,
    action: activityServicActions.LOGIN,
    module: "AUTH",
    description: `${existingUser.email} logged in successfully`,
  });
  console.log("Activity log created");

  return {
    ...existingUser.toObject(),
    accessToken,
    refreshToken,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
