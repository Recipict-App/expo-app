import { useQuery } from "@tanstack/react-query";
import { fetchRecommendedRecipes, fetchRandomRecipes } from "./RecipeFunctions";
import { queryKeysEnum } from "./_queryKeys";

export function useFetchRecommendedRecipes(pantryData: any) {
  return useQuery({
    queryKey: [queryKeysEnum.recipes],
    queryFn: () => fetchRecommendedRecipes(pantryData),
  });
}

export function useFetchRandomRecipes(pantryData: any) {
  return useQuery({
    queryKey: ["RANDOM_RECIPE"],
    queryFn: () => fetchRandomRecipes(pantryData),
    staleTime: Infinity,
  });
}
