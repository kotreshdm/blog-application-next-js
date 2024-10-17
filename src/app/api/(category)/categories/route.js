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

  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const createdBy = formData.get("createdBy");
    const image = formData.get("image");

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category already exists" },
        { status: 409 }
      );
    }

    let imageBuffer = null;
    if (image && image instanceof Blob) {
      const arrayBuffer = await image.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
    }

    const newCategory = await Category.create({
      name,
      description,
      createdBy,
      image: imageBuffer,
    });

    return NextResponse.json({
      success: true,
      message: "Category registered successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
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
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const updatedBy = formData.get("createdBy");
    const image = formData.get("image");
    const removeImage = formData.get("removeImage");

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    }

    const existingCategory = await Category.findOne({ name, _id: { $ne: id } });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category already exists" },
        { status: 409 }
      );
    }

    let imageBuffer = null;
    if (image && image instanceof Blob) {
      const arrayBuffer = await image.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
    }

    const updateData = {
      name,
      description,
      updatedBy,
    };

    if (imageBuffer) {
      updateData.image = imageBuffer;
    } else if (removeImage === "true" || removeImage === true) {
      updateData.image = null;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

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
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
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
