import { supabase } from "@/database/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

  if (data.password === password) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { success: false, error: "Auth error" },
    { status: 401 }
  );
}
