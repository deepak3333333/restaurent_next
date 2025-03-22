import { connectionStr } from "@/app/lib/db";
import { UserModel } from "@/app/lib/UserSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server"


export async function GET() {
    return NextResponse.json({ message: 'Hello World' })
    
}
export async function POST(request){
    let success=false;
    const payload=await request.json();
    await mongoose.connect(connectionStr)
    const user=new UserModel(payload)
    const result=await user.save()
    if(result){
        success=true
    }
    return NextResponse.json({result,success})
    

} 