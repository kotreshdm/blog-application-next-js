import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Post from "@/models/Post";
import slugify from "slugify";
import {
  CreateRequestBody,
  DeleteRequestBody,
  ErrorWithStatus,
  PutRequestBody,
} from "../interfaces/interface";
import { authenticateUser, errorResponse } from "../utils/helpes";

async function findPostOrFail(id: string) {
  const post = await Post.findById(id);
  if (!post) {
    throw { status: 404, message: "Blog not found" } as ErrorWithStatus;
  }
  return post;
}

function createSlug(name: string): string {
  return slugify(name, { lower: true, strict: true });
}

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .select("_id name createdAt blogStatus slug");
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return errorResponse("Failed to fetch data", 500);
  }
}

export async function POST(req: Request) {
  try {
    const createdBy = await authenticateUser();
    await dbConnect();
    const { name }: CreateRequestBody = await req.json();

    if (!name || name.length > 200) {
      return errorResponse(
        !name
          ? "Blog name is required"
          : "Blog name must be under 200 characters"
      );
    }

    const slug = createSlug(name);
    if (await Post.findOne({ slug })) {
      return errorResponse("Blog already exists");
    }

    const newPost = await Post.create({ name, slug, createdBy });
    return NextResponse.json(
      { success: true, category: newPost },
      { status: 201 }
    );
  } catch (error) {
    const err = error as ErrorWithStatus;
    console.error("Error creating blog:", err);
    return errorResponse(
      err.message || "Failed to create blog",
      err.status || 500
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await authenticateUser();
    const { id }: DeleteRequestBody = await req.json();
    if (!id) return errorResponse("Blog ID is required");

    await dbConnect();
    await findPostOrFail(id);
    await Post.findByIdAndDelete(id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const err = error as ErrorWithStatus;
    console.error("Error deleting blog:", err);
    return errorResponse(
      err.message || "Failed to delete blog",
      err.status || 500
    );
  }
}

export async function PUT(req: Request) {
  try {
    await authenticateUser();
    const { _id: id, name, seoKeyword }: PutRequestBody = await req.json();
    if (!id || !name) return errorResponse("Blog ID and name are required");

    await dbConnect();
    await findPostOrFail(id);

    const slug = createSlug(name);
    const existingSlug = await Post.findOne({ slug });
    if (existingSlug && existingSlug._id.toString() !== id) {
      return errorResponse("Blog already exists");
    }

    await Post.findByIdAndUpdate(id, { name, slug, seoKeyword }, { new: true });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const err = error as ErrorWithStatus;
    console.error("Error updating blog:", err);
    return errorResponse(
      err.message || "Failed to update blog",
      err.status || 500
    );
  }
}
