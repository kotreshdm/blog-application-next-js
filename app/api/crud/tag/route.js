import { NextResponse } from "next/server";
import Tag from "@/models/tag";
import dbConnect from "@/utils/dbConnect";
import slugify from "slugify";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export async function POST(req) {
  await dbConnect();
  const { name } = await req.json();
  const session = await getServerSession(authOptions);

  try {
    const tag = await Tag.create({
      name,
      slug: slugify(name),
      postedBy: session.user._id,
    });
    return NextResponse.json(tag);
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
