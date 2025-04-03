import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Categories from "@/models/Category";
import mongoose from "mongoose";
export async function DELETE(request: Request, { params }: { params: any }) {
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
    console.log("Deleted category:", existingCategory.name);

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
