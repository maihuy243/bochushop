import { ParentCategory, Product } from "@/data/products"
import { api } from "@/lib/axios"

export async function getAllProducts(): Promise<Product[]> {
  const res = await api.get("/all-products")
  return res.data ?? []
}


export async function getFlatProducts(): Promise<Product[]> {
  const res = await api.get("/products-flat")
  return res.data ?? []
}


// gọi API create
export async function createProduct(newProd: Partial<Product>) {
  const res = await fetch("/api/product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProd),
  });
  if (!res.ok) throw new Error("Create product failed");
  return res.json();
}

// gọi API update
export async function updateProduct(id: string, updates: Partial<Product>) {
  const res = await fetch(`/api/product?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Update product failed");
  return res.json();
}

// gọi API delete
export async function deleteProduct(id: string) {
  const res = await fetch(`/api/product?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Delete product failed");
  return res.json();
}
