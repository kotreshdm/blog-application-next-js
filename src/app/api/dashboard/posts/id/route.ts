import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Post from "@/models/Post";
import { authenticateUser } from "../../utils/helpes";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    await authenticateUser();
    await dbConnect();

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
