import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const {id} = params
    let success=false
    await mongoose.connect(connectionStr)
    const result=await foodSchema.findOne({_id:id})
    if(result){
        success=true
    }
return NextResponse.json({result,success})

}
export async function PUT(request,{params}){
    const payload=await request.json()
    const {id} = params
    let success=false
    await mongoose.connect(connectionStr)
    const result=await foodSchema.findOneAndUpdate({_id:id},payload)
    if(result){
        success=true
    }
return NextResponse.json({result,success})



    
    
}