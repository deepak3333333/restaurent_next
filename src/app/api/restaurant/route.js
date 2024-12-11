import { connectionStr } from "@/app/lib/db";
import { restaurantModel } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";

const { NextResponse } = require("next/server");

 export async function GET() {
    return NextResponse.json({messagse:"ok"})
    
}

export async function POST(request){
    let payload = await request.json();
    let result;
    let success=false;
    await mongoose.connect(connectionStr)
    .then(()=>{
        console.log("connected");
        
    })
    .catch((err)=>{
        console.log(err);
    })
    if(payload.login){
        result=await restaurantModel.findOne({email:payload.email,password:payload.password})
       if(result){
        success=true
       }
        
        //user login
       
       
    }
    else{
        //user signup
        const restaurant= new restaurantModel(payload)
        const result= await restaurant.save()
        if(result){
            success=true
        }
       }
return NextResponse.json({result,success})
}



