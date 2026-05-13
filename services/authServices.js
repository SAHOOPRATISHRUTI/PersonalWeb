const User = require("../models/user")
const bcrypt = require("bcrypt")

const registerUser = async (userData) => {

    const { name, email, password } = userData;
    const existingUser = await User.findOne({
        email
    })
    if (existingUser) {
        throw new Error("User already exists")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("hashedPassword==", hashedPassword);
    const newsUser = await User.create({
        name,
        email,
        password: hashedPassword
    })
    return newsUser;

}




module.exports = {
    registerUser
}