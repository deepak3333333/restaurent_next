import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";


export async function GET( request,{ params }){
    let success=false
     const id=params.id
    await mongoose.connect(connectionStr)
    const result=await foodSchema.find({ resto_id:id})
    if(result){
        success=true
    }


    return NextResponse.json({result,success})
}