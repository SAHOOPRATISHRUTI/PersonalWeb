const jwt = require("jsonwebtoken")
const Reasponse = require("../utils/response")
const message = require("../constants/message")

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES
        }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            userId: user._id
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES
        }
    );
};

const verifyAccessToken = (req,res,next)=>{
    const authHeader = req.headers.authHeader;

    if(!authHeader){
        return Reasponse.failResponse(
            res,
            401,
            message.unauthorized,
            null
        )
    }
    const token = authHeader.split(" ")[1];
    try{
        const decode = jwt.verify
    (
        token,
        process.env.JWT_ACCESS_SECRET
    );
    req.user = decode;
    next();
    }
    catch(error){
        console.log("Error==",error);
        return Reasponse.errorResponse(
            res,
            500,
            message.invalidToken,
            null
        )
    }
   
}


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken
}