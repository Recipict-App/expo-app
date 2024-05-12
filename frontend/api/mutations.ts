import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  editIngredientToFirebase,
  editPreferenceToFirebase,
} from "./DatabaseFunctions";
import { queryKeysEnum } from "./_queryKeys";

import { ingredientProps } from "../types/firebase-type";

export function useEditIngredientToFirebase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      userGoogleToken: String;
      newIngredients: ingredientProps[];
    }) =>
      await editIngredientToFirebase(data.userGoogleToken, data.newIngredients),

    onMutate: () => console.log("Changing ingredient..."),

    onSettled: async (_, error) => {
      if (error) {
        console.log("Encountered an error when trying to edit ingredient 😡");
        console.log(error);
      } else {
        console.log("Successfully edited ingredient! 🤩");
        await queryClient.invalidateQueries({
          queryKey: [queryKeysEnum.recipes],
        });
        await queryClient.removeQueries({ queryKey: [queryKeysEnum.recipes] });
      }
    },
  });
}

export function useEditPreferenceToFirebase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      userGoogleToken: String;
      newCuisines: string[];
      newDiets: string[];
    }) =>
      await editPreferenceToFirebase(
        data.userGoogleToken,
        data.newCuisines,
        data.newDiets
      ),

    onMutate: () => console.log("Changing preference..."),

    onSettled: async (_, error) => {
      if (error) {
        console.log("Encountered an error when trying to edit preference 😡");
        console.log(error);
      } else {
        console.log("Successfully edited preference! 🤩");
        await queryClient.invalidateQueries({
          queryKey: [queryKeysEnum.recipes],
        });
        await queryClient.removeQueries({ queryKey: [queryKeysEnum.recipes] });
      }
    },
  });
}
