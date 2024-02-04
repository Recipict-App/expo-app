import { useQueryClient, useMutation } from "@tanstack/react-query";
import { editIngredientToFirebase } from "./DatabaseFunctions";
import { ingredientProps } from "../firebase-type";

export function editIngredientToFirebaseMutation() {
  const QUERY_KEY = "ingredients";
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      userGoogleToken: String;
      newIngredients: ingredientProps[];
    }) =>  await editIngredientToFirebase(data.userGoogleToken, data.newIngredients),

    onMutate: () => console.log("Changing ingredient..."),

    onSettled: async (_, error) => {
      if (error) {
        console.log("Encountered an error when trying to edit ingredient 😡");
        console.log(error);
      } else {
        console.log("Successfully edited ingredient! 🤩");
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      }
    },
  });
}
