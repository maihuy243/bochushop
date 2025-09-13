import { supabase } from "@/database/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    const { data, error } = await supabase
      .from("auth_passwords")
      .select("password")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: "Auth error" },
        { status: 400 }
      );
    }

    if (data.password !== password) {
      return NextResponse.json(
        { success: false, error: "Sai mật khẩu" },
        { status: 401 }
      );
    }

    // ✅ Nếu đúng mật khẩu → set cookie
    const expireAt = Date.now() + 6 * 60 * 60 * 1000; // 6h
    const res = NextResponse.json({ success: true });

    res.cookies.set("isAuthed", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 6, // 6h
    });

    res.cookies.set("expireAt", String(expireAt), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 6,
    });

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
