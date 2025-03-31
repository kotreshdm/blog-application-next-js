import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Post from "@/models/Post";
import Category from "@/models/Category";

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.countDocuments();
    const categories = await Category.countDocuments();

    return NextResponse.json({ posts, categories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
