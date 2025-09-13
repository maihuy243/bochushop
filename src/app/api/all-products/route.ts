import { supabase } from "@/database/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  // lấy products
  const { data: prods, error: errProds } = await supabase
    .from("products")
    .select("*")
    .order("order", { ascending: true });

  if (errProds) {
    console.error("Load products failed:", errProds);
    return NextResponse.json({ error: errProds.message }, { status: 500 });
  }

  return NextResponse.json(prods);
}
