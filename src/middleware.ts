import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAuthed = req.cookies.get("isAuthed")?.value;

  // Nếu chưa auth mà vào /admin → redirect về /auth
  if (req.nextUrl.pathname.startsWith("/admin") && isAuthed !== "true") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // bảo vệ tất cả route dưới /admin
};
