import { connectionStr } from "@/app/lib/db";
import { restaurantModel } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";

const { NextResponse } = require("next/server");

 export async function GET() {
    return NextResponse.json({messagse:"ok"})
    
}

export async function POST(request){
    let payload = await request.json();
    await mongoose.connect(connectionStr)
    .then(()=>{
        console.log("connected");
        
    })
    .catch((err)=>{
        console.log(err);
    })
    const restaurant= new restaurantModel(payload)
   const result= await restaurant.save()
   
   

    return NextResponse.json({result,success:true})
}



