import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import slugify from "slugify";

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find().sort({ createdAt: -1 });
    // const categories = await Category.countDocuments();

    return NextResponse.json(posts, { status: 200 });
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

    const { name, ...rest } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Blog name is required" },
        { status: 400 }
      );
    }

    if (name.length > 200) {
      return NextResponse.json(
        { error: "Blog name is not more then 200 char" },
        { status: 400 }
      );
    }
    const slug = slugify(name, { lower: true, strict: true });
    // Check if category already exists
    const existingBlog = await Post.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json(
        { error: "Blog already exists" },
        { status: 400 }
      );
    }

    // Create a new category
    const newCategory = new Post({
      name,
      slug,
      createdBy,
      ...rest,
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
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
