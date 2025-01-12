import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodModel";
import { restaurantModel } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){
    let id=content.params.id
    
    await mongoose.connect(connectionStr)
    const details=await restaurantModel.findOne({_id:id})
    const foodItem=await foodSchema.find({
        resto_id:id})
        
    return NextResponse.json({details,foodItem,success:true})
    
    

}