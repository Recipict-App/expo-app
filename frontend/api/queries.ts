import { useQuery } from "@tanstack/react-query";
import { fetchRecommendedRecipes, fetchRandomRecipes } from "./RecipeFunctions";
import { queryKeysEnum } from "./_queryKeys";

export function useFetchRecommendedRecipes(pantryData: any) {
  console.log("Fetching recommended recipes with REACT QUERY...");
  return useQuery({
    queryKey: [queryKeysEnum.recipes],
    queryFn: () => fetchRecommendedRecipes(pantryData),
  })
}

export function useFetchRandomRecipes(pantryData: any) {
  console.log("Fetching random recipes with REACT QUERY...");
  return useQuery({
    queryKey: [queryKeysEnum.recipes],
    queryFn: () => fetchRandomRecipes(pantryData),
  })
}

