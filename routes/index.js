const route = require("express").Router()
const authRouter   = require("./authRoute")
const activityRoute = require("./activityRoute")

route.use("/auth",authRouter)
route.use("/activity",activityRoute)

module.exports = route