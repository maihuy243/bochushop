import { supabase } from "@/database/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  // lấy categories
  const { data: cats, error: errCats } = await supabase
    .from("parent_categories")
    .select("*");
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

  // flat merge
  const result = prods.map((p) => {
    const collection = cols.find((c) => c.id === p.collection_id);
    const category = cats.find((pc) => pc.id === collection?.parent_category_id);

    return {
      product_id: p.id,
      product_title: p.title,
      price: p.price,
      currency: p.currency,
      images: p.images,
      badges: p.badges,
      sku: p.sku,
      stock: p.stock,
      description: p.description,
      specs: p.specs ?? [],
      size: p.size ?? [],
      created_at: p.created_at,

      collection_id: collection?.id,
      collection_title: collection?.title,

      category_id: category?.id,
      category_title: category?.title,
    };
  });

  return NextResponse.json(result);
}
