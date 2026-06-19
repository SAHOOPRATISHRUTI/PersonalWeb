const route = require("express").Router()
const dailyInfoController = require("../controller/dailyinfoController")
const middleware = require("../middleware/authmiddleware")

route.post("/create", middleware.verifyAccessToken, dailyInfoController.createDailyInfo)
route.get("/", middleware.verifyAccessToken, dailyInfoController.getDailyInfo)
route.put("/update/:dailyInfoId", middleware.verifyAccessToken, dailyInfoController.updateDailyInfo)
route.delete("/delete/:dailyInfoId", middleware.verifyAccessToken, dailyInfoController.deleteDailyInfo)

module.exports = route