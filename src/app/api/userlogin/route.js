import { connectionStr } from "@/app/lib/db";
import { UserModel } from "@/app/lib/UserSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server"
export async function POST(request) {
    let success=false
    let payload = await request.json();
    await mongoose.connect(connectionStr)
    let result=await UserModel.find({email:payload.email,password:payload.password})
    // console.log(result,"this is result of login data ");
    
    if(result){
        success=true

    }
    return NextResponse.json({result,success})
}
// let success=false
//     let payload = await request.json();
//     awaitmongoose.connect(connectionStr)
//     let result=await UserModel.find({email:payload.email,password:payload.password})
//     console.log(result,"this is result of login data ");


