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
    await mongoose.connect(connectionStr)
    .then(()=>{
        console.log("connected");
        
    })
    .catch((err)=>{
        console.log(err);
    })
    if(payload.login){
        //user login
        result=await restaurantModel.find({email:payload.email,password:payload.password})
    }
    else{
        //user create
        const restaurant= new restaurantModel(payload)
   const result= await restaurant.save()
}
return NextResponse.json({result,success:true})
}



