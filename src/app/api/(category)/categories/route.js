import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";
import { getServerSession } from "next-auth/next";

export async function GET(req) {
  await dbConnect();
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    console.log(categories);
    return NextResponse.json({
      success: true,
      count: categories.length,
      categories: categories,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const session = await getServerSession({ req });

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  await dbConnect();
  const { name } = await req.json();
  try {
    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category already exists" },
        { status: 409 }
      );
    }

    const newCategory = await Category.create({
      name,
      createdBy: session.user.name,
    });
    return NextResponse.json({
      success: true,
      message: "Category registered successfully",
      category: newCategory,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
