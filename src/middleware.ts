import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/admin"];
  const protectedAPIRoutes = ["/api/dashboard", "/api/admin"];

  const isProtectedPage = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  const isProtectedAPI = protectedAPIRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // If trying to access a protected API and not authenticated -> return 401
  if (isProtectedAPI && !token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // If trying to access a protected page and not authenticated -> redirect to login
  if (isProtectedPage && !token) {
    const redirectUrl = new URL("/signin", req.url);
    redirectUrl.searchParams.set("callbackUrl", req.nextUrl.pathname); // Store original URL

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// Apply middleware to protect these paths
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/dashboard/:path*",
    "/api/admin/:path*",
  ],
};
