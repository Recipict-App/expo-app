import { userDataType, ingredientProps } from "../firebase-type";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getLocalUser() {
  const data: any = await AsyncStorage.getItem("@user");
  if (!data) return null;
  return JSON.parse(data);
}

export async function setLocalUser(
  user: any,
  setUserInfo: React.Dispatch<any>
) {
  await AsyncStorage.setItem("@user", JSON.stringify(user));
  setUserInfo(user);
}

export async function deleteCurrentLocalUser(
  setUserInfo: React.Dispatch<any>,
  setUserData: React.Dispatch<any>
) {
  await AsyncStorage.removeItem("@user");
  setUserInfo(undefined);
  setUserData(undefined);
}

export async function getGoogleAccountDetails(AccessTokenGoogle: string) {
  const google_api_url = process.env.EXPO_GOOGLEAPI_ACCOUNT_DETAILS || "";
  if (!google_api_url) throw new Error("google_api_url not found");

  const response = await fetch(google_api_url, {
    headers: { Authorization: `Bearer ${AccessTokenGoogle}` },
  });

  // Set user info to local storage
  const user = await response.json();

  return user;
}

export async function getOrCreateUserDataInFirebase(
  user: any,
  setUserData: React.Dispatch<React.SetStateAction<userDataProps[] | undefined>>
) {
  const retrieve_user_url = process.env.EXPO_CF_RETRIEVE_USER || "";
  if (!retrieve_user_url) throw new Error("Cloudfunction - retrieve_user_url not found");

  const checkUserResponse = await fetch(
    retrieve_user_url,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: user.id }),
    }
  );

  if (checkUserResponse.status == 404) {
    console.log("User not found in Firebase, creating new user... 🤔");
    const localUserData: userDataType = 
      {
        name: user.name,
        email: user.email,
        googleToken: `${user.id}`,
        ingredients: [],
        cuisines: [],
        diets: [],
        subscription: "Regular",
      }

    setUserData(localUserData);

    const create_user_url = process.env.EXPO_CF_CREATE_USER || "";
    if (!create_user_url) throw new Error("Cloudfunction - create_user_url not found");
    const createUserResponse = await fetch(
      create_user_url,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(localUserData[0]),
      }
    );

    if (createUserResponse.status == 200) {
      console.log("User created in Firebase, retrieving user data... 🥰");

      const user = await createUserResponse.json();
      const userDatabase = user.userData;

      await setUserData(userDatabase);
    } else {
      console.log("Error creating user in Firebase 😡");
    }
  } else {
    console.log("User found in Firebase, retrieving user data... 🤩");

    const user = await checkUserResponse.json();
    const userDatabase = user.userData;

    await setUserData(userDatabase);
  }
}

export async function getUserDataFromFirebaseAndSetContext(
  setUserData: React.Dispatch<React.SetStateAction<userDataType[] | undefined>>
) {
  const user = await getLocalUser();

  const retrieve_user_url = process.env.EXPO_CF_RETRIEVE_USER || "";
  if (!retrieve_user_url) throw new Error("Cloudfunction - retrieve_user_url not found");

  const checkUserResponse = await fetch(
    retrieve_user_url,
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

export async function editIngredientToFirebase(
  userGoogleToken: String,
  newIngredients: ingredientProps[]
) {
  const edit_ingredients_url = process.env.EXPO_CF_EDIT_INGREDIENTS || "";
  if (!edit_ingredients_url) throw new Error("Cloudfunction - edit_ingredients_url not found");

  const response = await fetch(
    edit_ingredients_url,
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

  if (response.status !== 200)
    console.log("Something went wrong when trying to edit ingredients 😡");

  const data = await response.json();

  // optional
  return data;
}

export async function editPreferenceToFirebase(
  userGoogleToken: String,
  newCuisines: string[],
  newDiets: string[],
) {
  const edit_preferences_url = process.env.EXPO_CF_EDIT_PREFERENCES || "";
  if (!edit_preferences_url) throw new Error("Cloudfunction - edit_preferences_url not found");

  const response = await fetch(
    edit_preferences_url,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: userGoogleToken,
        cuisines: newCuisines,
        diets: newDiets,
      }),
    }
  );

  if (response.status !== 200)
    console.log("Something went wrong when trying to edit preference 😡");

  const data = await response.json();

  // optional
  return data;
}
