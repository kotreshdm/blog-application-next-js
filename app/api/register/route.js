import { NextResponse } from "next/server";
import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { name, email, password } = await req.json();
  await dbConnect();
  try {
    await new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    }).save();
    return NextResponse.json({ success: "User created successfully" });
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 422 });
  }
}
