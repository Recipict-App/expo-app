import { useQuery } from "@tanstack/react-query";
import { fetchRecommendedRecipes } from "./RecipeFunctions";
import { queryKeysEnum } from "./_queryKeys";

export function useFetchRecommendedRecipes(pantryData: any) {
  console.log("Fetching recommended recipes with REACT QUERY...");
  return useQuery({
    queryKey: [queryKeysEnum.recipes],
    queryFn: () => fetchRecommendedRecipes(pantryData),
  })
}

