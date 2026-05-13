const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const route = require("./routes/index") 
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.end("api is running")
})

app.use("/expense-tracker",route)

module.exports=app;