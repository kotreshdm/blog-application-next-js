import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Categories from "@/models/Category";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import {
  CreateRequestBody,
  DeleteRequestBody,
  ErrorWithStatus,
} from "../interfaces/interface";
import { authenticateUser, errorResponse } from "../utils/helpes";

export async function GET() {
  try {
    await dbConnect();
    const categories = await Categories.find().sort({ createdAt: -1 });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return errorResponse("Failed to fetch data", 500);
  }
}

export async function POST(req: Request) {
  try {
    await authenticateUser();
    await dbConnect();
    const { name }: CreateRequestBody = await req.json();

    if (!name || name.length > 50) {
      return errorResponse(
        !name
          ? "Category name is required"
          : "Category name must be under 50 characters"
      );
    }

    const existingCategory = await Categories.findOne({ name });
    if (existingCategory) {
      return errorResponse("Category already exists");
    }

    const createdBy = (await getServerSession(authOptions))?.user.id;

    const newCategory = await Categories.create({ name, createdBy });
    return NextResponse.json(
      { success: true, category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    const err = error as ErrorWithStatus;
    console.error("Error creating category:", err);
    return errorResponse(
      err.message || "Failed to create category",
      err.status || 500
    );
  }
}

export async function PUT(req: Request) {
  try {
    await authenticateUser();
    await dbConnect();
    const { name, _id: id }: CreateRequestBody = await req.json();

    if (!id || !name) return errorResponse("Category ID and name are required");
    if (name.length > 50)
      return errorResponse("Category name must be under 50 characters");

    const existingCategory = await Categories.findOne({
      _id: { $ne: id },
      name,
    });
    if (existingCategory) {
      return errorResponse("Category already exists");
    }

    const updatedCategory = await Categories.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        category: updatedCategory,
        message: `Category updated: ${name}`,
      },
      { status: 200 }
    );
  } catch (error) {
    const err = error as ErrorWithStatus;
    console.error("Error updating category:", err);
    return errorResponse(
      err.message || "Failed to update category",
      err.status || 500
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await authenticateUser();
    await dbConnect();
    const { id }: DeleteRequestBody = await req.json();

    if (!id) return errorResponse("Category ID is required");

    const existingCategory = await Categories.findById(id);
    if (!existingCategory) {
      return errorResponse("Category not found", 404);
    }

    const blogCount = await Post.countDocuments({ category: id });
    if (blogCount > 0) {
      return errorResponse(
        "This category is associated with blogs. Please delete them first."
      );
    }

    await Categories.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: `Deleted category: ${existingCategory.name}`,
      },
      { status: 200 }
    );
  } catch (error) {
    const err = error as ErrorWithStatus;
    console.error("Error deleting category:", err);
    return errorResponse(
      err.message || "Failed to delete category",
      err.status || 500
    );
  }
}
