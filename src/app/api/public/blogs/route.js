import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/config/models/blog";
import Category from "@/config/models/category";

export async function GET(req) {
  await dbConnect();
  try {
    const categories = await Category.find({});
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (slug) {
      let blog = await Blog.findOne({ slug });
      return NextResponse.json(blog);
    }
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    const allBlogs = blogs.map((blog) => ({
      _id: blog._id,
      name: blog.name,
      shortDescription: blog.shortDescription,
      category: categories.find((c) => c._id.toString() === blog.category).slug,
      seoDescription: blog.seoDescription,
      seoKeyword: blog.seoKeyword,
      status: blog.status,
      image: blog.image,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      slug: blog.slug,
    }));
    return NextResponse.json(allBlogs);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
