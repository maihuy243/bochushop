import { supabase } from "@/database/supabase";
import { NextResponse } from "next/server";

function generateRandomPassword(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let pass = "";
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
}

export async function POST() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data: latest, error } = await supabase
    .from("auth_passwords")
    .select("id, created_at")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  if (!latest) {
    const newPassword = generateRandomPassword();
    await supabase.from("auth_passwords").insert([{ password: newPassword }]);
    return NextResponse.json({ success: true, reset: true });
  }

  const lastCreated = new Date(latest.created_at);
  lastCreated.setHours(0, 0, 0, 0);
  if (lastCreated.getTime() === today.getTime()) {
    return NextResponse.json({ success: true, reset: false });
  }

  const newPassword = generateRandomPassword();
  await supabase.from("auth_passwords").insert([{ password: newPassword }]);

  return NextResponse.json({ success: true, reset: true });
}