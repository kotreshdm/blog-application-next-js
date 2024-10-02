import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
export async function POST(req) {
  await dbConnect();
  const { name, email, password } = await req.json();
  console.log(name, email, password);

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
