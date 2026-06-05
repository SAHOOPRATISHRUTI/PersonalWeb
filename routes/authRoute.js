const route = require("express").Router()
const authController = require("../controller/authController")
const middleware = require("../middleware/authmiddleware")


route.post("/register",authController.registerUser)
route.post("/login",authController.loginUser)
route.get("/profile", middleware.verifyAccessToken, authController.getProfile)

module.exports = route