import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { name, email, password } = await req.json();
  const db = await dbConnect();
  const collection = db.collection("User");
  console.log(name, email, password);

  try {
    await collection.insertOne({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    return NextResponse.json({ success: "User created successfully" });
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 422 });
  }
}
