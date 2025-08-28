import { ParentCategory, Product } from "@/data/products"
import { api } from "@/lib/axios"

export async function getCategories(): Promise<ParentCategory[]> {
  const res = await api.get("/all-data")
  return res.data ?? []
}


export async function getFlatProducts(): Promise<Product[]> {
  const res = await api.get("/products-flat")
  return res.data ?? []
}
