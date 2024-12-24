import { connectionStr } from "@/app/lib/db";
import { restaurantModel } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";

import { NextResponse } from "next/server";


export async function GET(request) {
let success=false
await mongoose.connect(connectionStr)
let result=await restaurantModel.find()
if(result){
    success=true
}
result = result.map((item) => item.city)
result=[...new Set(result)]

return NextResponse.json({result,success})
    
}
