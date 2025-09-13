
const url = 'https://script.google.com/macros/s/AKfycbwDPBNXe_ou0UrNHxIcAUBQP_6wdNf3TxYxONDB2qsomI6n3KU_isKyWfHFS8I1MkoaEg/exec'

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, phone } = await req.json();

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone }),
    });

    const result = await response.json();

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Google Script error:", err);
    return NextResponse.json({ error: "Append thất bại" }, { status: 500 });
  }
}
