import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import cloudinary from "cloudinary";

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  console.log("Reached");
  const { image } = await req.json();
  await dbConnect();

  try {
    const result = await cloudinary.uploader.upload(image);
    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}
