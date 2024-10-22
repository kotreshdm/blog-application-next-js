import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/config/models/category";

export async function GET(req) {
  await dbConnect();
  try {
    const categories = await Category.find({});
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
