import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Categories from "@/models/Category";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import Post from "@/models/Post";

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

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
    await dbConnect();

    // Fetch category before deleting
    const { name, id } = await request.json();

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

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { id } = await req.json();

    // Fetch category before deleting
    const existingCategory = await Categories.findById(id);
    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    //checke deleting exisitn blog associated with this category
    const blogCount = await Post.countDocuments({ category: id });

    if (blogCount > 0) {
      return NextResponse.json(
        {
          error:
            "This category is associated with blogs. Please delete them first.",
        },
        { status: 400 }
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
