import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Categories from "@/models/Category";
import mongoose from "mongoose";
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = await params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    // Fetch category before deleting
    const existingCategory = await Categories.findById(id);
    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Delete category
    await Categories.findByIdAndDelete(id);

    return NextResponse.json({
      message: `Deleted category: ${existingCategory.name}`,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = await params;
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    // Fetch category before deleting
    const { name } = await request.json();

    //check if the name is already existe and also of the is is same category
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
    // Check if category already exists and is not the same as the current one
    const existingCategory = await Categories.findOne({
      _id: { $ne: id },
      name,
    });
    if (existingCategory) {
      return NextResponse.json(
        { error: "Category already exists!" },
        { status: 400 }
      );
    }

    // Update category
    await Categories.findByIdAndUpdate(id, { name }, { new: true });

    return NextResponse.json({
      message: `Category updated : ${name}`,
      success: true,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to updating category" },
      { status: 500 }
    );
  }
}
