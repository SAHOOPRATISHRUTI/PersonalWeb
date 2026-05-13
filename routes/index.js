const route = require("express").Router()
const authRouter   = require("./authRoute")

route.use("/auth",authRouter)
module.exports = route