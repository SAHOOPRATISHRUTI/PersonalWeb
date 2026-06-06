const route = require("express").Router()
const dailyInfoController = require("../controller/dailyinfoController")
const middleware = require("../middleware/authmiddleware")

route.post("/create", middleware.verifyAccessToken, dailyInfoController.createDailyInfo)
route.get("/", middleware.verifyAccessToken, dailyInfoController.getDailyInfo)

module.exports = route