const route = require("express").Router()
const authController = require("../controller/authController")

route.post("/register",authController.registerUser)

module.exports = route