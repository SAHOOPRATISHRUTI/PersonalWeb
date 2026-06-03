const activityController = require("../controller/activityController");
const route = require("express").Router()

route.get("/logs",activityController.getActivities)

module.exports = route