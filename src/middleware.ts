import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAuthed = req.cookies.get("isAuthed")?.value;
  const expireAt = req.cookies.get("expireAt")?.value;

  // Chưa login
  if (req.nextUrl.pathname.startsWith("/admin") && isAuthed !== "true") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Hết hạn
  if (expireAt && Date.now() > Number(expireAt)) {
    const res = NextResponse.redirect(new URL("/auth", req.url));
    res.cookies.delete("isAuthed");
    res.cookies.delete("expireAt");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
