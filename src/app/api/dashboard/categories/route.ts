import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Categories from "@/models/Category";

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function GET() {
  try {
    await dbConnect();

    const categories = await Categories.find().sort({ createdAt: -1 });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const createdBy = session.user.id;

    await dbConnect();

    const { name } = await req.json();
    if (!name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    if (name.length > 50) {
      return NextResponse.json(
        { error: "Category name is not more then 50 char" },
        { status: 400 }
      );
    }

    // Check if category already exists
    const existingCategory = await Categories.findOne({ name });
    if (existingCategory) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 400 }
      );
    }

    // Create a new category
    const newCategory = new Categories({
      name,
      createdBy,
    });

    // Save to the database
    await newCategory.save();

    return NextResponse.json(
      { success: true, category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
