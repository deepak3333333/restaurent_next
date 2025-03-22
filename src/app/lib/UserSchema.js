const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    address:String,
    city:String,
    phoneNumber:String
},{timestamps:true})


export  const UserModel=mongoose.models.User || mongoose.model("User",UserSchema)
