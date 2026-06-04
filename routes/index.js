const route = require("express").Router()
const authRouter   = require("./authRoute")
const activityRoute = require("./activityRoute")
const todoRoute = require("./todoRoute")

route.use("/auth",authRouter)
route.use("/activity",activityRoute)
route.use("/todo",todoRoute)

module.exports = route