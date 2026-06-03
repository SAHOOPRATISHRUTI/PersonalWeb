const route = require("express").Router()
const authController = require("../controller/authController")

route.post("/register",authController.registerUser)
route.post("/login",authController.loginUser)

module.exports = route