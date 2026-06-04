const activityController = require("../controller/activityController");
const route = require("express").Router()
const middleware = require("../middleware/authmiddleware")

route.get("/logs", middleware.verifyAccessToken,activityController.getActivities)

module.exports = route