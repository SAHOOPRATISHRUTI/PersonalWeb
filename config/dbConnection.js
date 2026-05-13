
const mongoose = require("mongoose")
const dbURL = `${process.env.MONGO_URI}${process.env.MONGO_DB}`

console.log("dbURLL==========",dbURL)

const connectDB = async()=>{
    try{
        const connection = mongoose.connect(dbURL)
        await connection;
        console.log("MONGODB Connected Sucessfully")
    }
    catch(error){
        console.log("ERRROR====",error);
        
    }
}

module.exports = connectDB