import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth/next";
import Blog from "@/config/models/blog";
import slugify from "slugify";

export async function GET(req) {
  const session = await getServerSession({ req });

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  await dbConnect();
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      count: blogs.length,
      blogs: blogs,
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
    const shortDescription = formData.get("shortDescription");
    const description = formData.get("description");
    const createdBy = formData.get("createdBy");
    const image = formData.get("image");
    const category = formData.get("category");
    const seoDescription = formData.get("seoDescription");
    const seoKeyword = formData.get("seoKeyword");
    const status = formData.get("status");
    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    }

    const existingBlog = await Blog.findOne({ name });

    if (existingBlog) {
      return NextResponse.json(
        { success: false, message: `Blog already exists : ${name}` },
        { status: 409 }
      );
    }

    let imageBuffer = null;
    if (image && image instanceof Blob) {
      const arrayBuffer = await image.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
    }

    const newBlog = await Blog.create({
      name,
      slug: slugify(name, { lower: true }),
      shortDescription,
      description,
      createdBy,
      image: imageBuffer,
      category,
      seoDescription,
      seoKeyword,
      status,
    });

    return NextResponse.json({
      success: true,
      message: `Blog created successfully : ${name}`,
      blog: newBlog,
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
    const shortDescription = formData.get("shortDescription");
    const category = formData.get("category");
    const description = formData.get("description");
    const updatedBy = formData.get("createdBy");
    const image = formData.get("image");
    const removeImage = formData.get("removeImage");
    const seoDescription = formData.get("seoDescription");
    const seoKeyword = formData.get("seoKeyword");
    const status = formData.get("status");

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    }

    const existingBlog = await Blog.findOne({ name, _id: { $ne: id } });
    if (existingBlog) {
      return NextResponse.json(
        { success: false, message: `Blog already exists : ${name}` },
        { status: 409 }
      );
    }

    let imageBuffer = null;
    if (image && image instanceof Blob) {
      const arrayBuffer = await image.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
    }

    const updatedData = {
      name,
      slug: slugify(name, { lower: true }),
      shortDescription,
      description,
      category,
      updatedBy,
      seoDescription,
      seoKeyword,
      status,
    };

    if (imageBuffer) {
      updatedData.image = imageBuffer;
    } else if (removeImage === "true" || removeImage === true) {
      updatedData.image = null;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: `Blog not found : ${name}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Blog updated successfully : ${name}`,
      blog: updatedBlog,
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

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Blog deleted successfully : ${name}`,
      bklog: deletedBlog,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
