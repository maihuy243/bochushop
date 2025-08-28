import { getFlatProducts } from "@/lib/apis"
import { useQuery } from "@tanstack/react-query"

export function useFlatProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getFlatProducts,
    staleTime: 1000 * 60 * 5, // cache 5 phút
  })
}
