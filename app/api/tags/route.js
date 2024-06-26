import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";
// import Blog from "@/models/blog";

export async function GET(req, context) {
  await dbConnect();

  const slug = "test";
  const page = req.nextUrl.searchParams.get("page") || 1;
  const pageSize = 6;

  try {
    const tag = await Tag.find();

    const skip = (page - 1) * page;
    const totalBlogs = 10;

    // const blogs = await Blog.find({ tags: tag._id })
    //   .select("-content")
    //   .populate("tags", "name slug")
    //   .populate("postedBy", "name")
    //   .skip(skip)
    //   .limit(pageSize)
    //   .sort({ createdAt: -1 });

    return NextResponse.json(tag);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err.message, status: 500 });
  }
}
