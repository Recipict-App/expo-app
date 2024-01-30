import { userDataProps, ingredientProps } from "../firebase-type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

const getLocalUser = async () => {
  const data: any = await AsyncStorage.getItem("@user");
  if (!data) return null;
  return JSON.parse(data);
};

export async function getUserDataFromFirebaseAndSetContext(
  setUserData: React.Dispatch<React.SetStateAction<userDataProps[] | undefined>>
) {
  const user = await getLocalUser();
  const checkUserResponse = await fetch(
    "https://us-central1-recipict-gcp.cloudfunctions.net/function-retrieve-user",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: user.id }),
    }
  );

  switch (checkUserResponse.status) {
    case 404:
      console.log(
        "User not found in Firebase when trying to retrieve user data 😡"
      );
      break;
    case 200:
      console.log("User found in Firebase, retrieving user data... 🤩");

      const user = await checkUserResponse.json();
      const userDatabase = user.userData;

      setUserData(userDatabase);
      break;
  }
}

export async function editIngredientToFirebase(userGoogleToken: String, newIngredients: ingredientProps[]) {
    const response = await fetch(
        "https://us-central1-recipict-gcp.cloudfunctions.net/function-edit-ingredients",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: userGoogleToken,
            ingredients: newIngredients,
          }),
        }
      );

      if (response.status !== 200) {
        console.log("Something went wrong when trying to edit ingredients 😡");
      }

      const data = await response.json();

      // optional
      return data;
}
