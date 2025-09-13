import { getAllProducts } from "@/lib/apis"
import { useQuery } from "@tanstack/react-query"

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5, // cache 5 phút
  })
}
