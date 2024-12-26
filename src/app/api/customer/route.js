import { connectionStr } from "@/app/lib/db";
import { restaurantModel } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function GET(request) {
  let filter = {};
  let queryParmas = request.nextUrl.searchParams;

  if (queryParmas.get("location")) {
    let city = queryParmas.get("location");
    filter = { city: { $regex: new RegExp(city, "i") } };
  } else if (queryParmas.get("restaurant")) {
    let name = queryParmas.get("restaurant");
    filter = { name: { $regex: new RegExp(name, "i") } };
  }

  await mongoose.connect(connectionStr);
  let result = await restaurantModel.findOne(filter);

  return NextResponse.json({ result });
}
