import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log(request);
  try {
    // Your authentication logic here

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
