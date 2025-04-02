const { default: mongoose } = require("mongoose");


const orderSchema = new mongoose.Schema({
    user_id:mongoose.Schema.Types.ObjectId,
    foodItemIds:String,
    resot_id:mongoose.Schema.Types.ObjectId,
    delivery_id:String,
    status:String,
    amount:String

    
});
export const orderModel=mongoose.models.orders || mongoose.model("orders",orderSchema);