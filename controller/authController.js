const registerService = require("../services/authServices");
const Response = require("../utils/response")

const registerUser = async(req,res)=>{
     try{
        const UserData = req.body;
        const newUser = await registerService.registerUser(UserData)
         return Response.SucessResponse(res, 'User created successfully', newUser,200);
     }
     catch(error){
        console.log("Error==",error);
        return Response.errorResponse(res, 'Error occurred while creating user', null,500);
     }
}
module.exports={
    registerUser
}