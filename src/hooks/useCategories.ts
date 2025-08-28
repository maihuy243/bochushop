import { getCategories } from "@/lib/apis"
import { useQuery } from "@tanstack/react-query"

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // cache 5 phút
  })
}
