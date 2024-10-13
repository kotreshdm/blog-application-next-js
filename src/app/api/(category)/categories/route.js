import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";
import { getServerSession } from "next-auth/next";

export async function GET(req) {
  const session = await getServerSession({ req });

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  await dbConnect();
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
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
  const { name, description, createdBy } = await req.json();

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
      description,
      createdBy,
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
export async function PUT(req) {
  const session = await getServerSession({ req });

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await dbConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const { name, description, updatedBy } = await req.json();

  if (!name || name.trim() === "") {
    return NextResponse.json(
      { success: false, message: "Category name is required" },
      { status: 400 }
    );
  }

  try {
    const existingCategory = await Category.findOne({ name, _id: { $ne: id } });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category name already exists" },
        { status: 409 }
      );
    }

    // Get the user ID from the session
    const userId = session.user.id;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description, updatedBy },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    const status = error.name === "ValidationError" ? 400 : 500;
    return NextResponse.json(
      { success: false, message: error.message },
      { status }
    );
  }
}
export async function DELETE(req) {
  const session = await getServerSession({ req });

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Category ID is required" },
        { status: 400 }
      );
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        { success: false, message: "Category not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
