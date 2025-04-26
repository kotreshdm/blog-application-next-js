import { NextResponse } from "next/server";
import { ErrorWithStatus } from "../interfaces/interface";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function authenticateUser(): Promise<string> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw { status: 401, message: "User not authenticated" } as ErrorWithStatus;
  }
  return session.user.id;
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}
