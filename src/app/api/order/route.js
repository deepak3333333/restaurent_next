import { connectionStr } from "@/app/lib/db";
import { orderModel } from "@/app/lib/orderSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request){
    let success=false;
    let payload = await request.json();
    await mongoose.connect(connectionStr)

    const orderObj=new orderModel(payload)
    const result=await orderObj.save()
    if(result){
        success=true;
    }
    return NextResponse.json({result,success})

}