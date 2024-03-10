import { userDataProps, ingredientProps } from "../firebase-type";
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
  const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
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

  if (checkUserResponse.status == 404) {
    console.log("User not found in Firebase, creating new user... 🤔");
    const localUserData: userDataProps[] = [
      {
        name: user.name,
        email: user.email,
        googleToken: `${user.id}`,
        ingredients: [],
        preferences: { diet: [], cuisine: [] },
        subscription: "Regular",
      },
    ];

    setUserData(localUserData);

    const createUserResponse = await fetch(
      "https://us-central1-recipict-gcp.cloudfunctions.net/function-create-user",
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

export async function editIngredientToFirebase(
  userGoogleToken: String,
  newIngredients: ingredientProps[]
) {
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
  const response = await fetch(
    "https://us-central1-recipict-gcp.cloudfunctions.net/function-edit-preference",
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
