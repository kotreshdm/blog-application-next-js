import Category from "@/models/Category";
import { getSession } from "next-auth/react";

// In your API route
export async function POST(req) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { name } = await req.json();

  try {
    const category = await Category.create({
      name,
      createdBy: session.user.id,
    });

    return res.status(201).json(category);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
