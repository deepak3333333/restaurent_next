const { default: mongoose } = require("mongoose");

const restaurantSchema = new mongoose.Schema({
   email:String,
   password:String,
   name:String,
   city:String,
   address:String,
   contact:String,

    
    
})
export const restaurantModel=mongoose.models.restaurant || mongoose.model("restaurant",restaurantSchema)