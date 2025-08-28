import { supabase } from "@/database/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  // lấy categories
  const { data: cats, error: errCats } = await supabase
    .from("parent_categories")
    .select("*")
    .order("orders", { ascending: true });

  if (errCats) {
    console.error("Load categories failed:", errCats);
    return NextResponse.json({ error: errCats.message }, { status: 500 });
  }

  // lấy collections
  const { data: cols, error: errCols } = await supabase
    .from("collections")
    .select("*");

  if (errCols) {
    console.error("Load collections failed:", errCols);
    return NextResponse.json({ error: errCols.message }, { status: 500 });
  }

  // lấy products
  const { data: prods, error: errProds } = await supabase
    .from("products")
    .select("*");

  if (errProds) {
    console.error("Load products failed:", errProds);
    return NextResponse.json({ error: errProds.message }, { status: 500 });
  }

  // merge thủ công
  const result = cats.map((pc) => ({
    ...pc,
    collections: cols
      .filter((c) => c.parent_category_id === pc.id)
      .map((c) => ({
        ...c,
        products: prods
          .filter((p) => p.collection_id === c.id)
          .map((p) => ({
            ...p,
            specs: p.specs ?? [], // default = []
            size: p.size ?? [],   // default = []
          })),
      })),
  }));

  return NextResponse.json(result);
}
