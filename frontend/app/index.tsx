import React, { useState, useEffect } from "react";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";

import { Redirect } from "expo-router";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

WebBrowser.maybeCompleteAuthSession();

export enum ingredientTypes {
  "Produce",
  "Grains",
  "Meats and Poultry",
  "Dairy",
  "Seafood",
  "Herbs and Spices",
  "Nuts & Seeds",
  "Oils",
  "Sweeteners & Condiments",
}

export enum subscriptionTypes {
  "Regular",
  "Pro",
}

export interface ingredient {
  name: String;
  quantity: number;
  unit: String;
  expiryDate: Date;
  dateAdded: Date;
  type: ingredientTypes;
}

export interface preferences {
  diet: String[];
  cuisine: String[];
}

export interface userDataProps {
  name: String;
  email: String;
  googleToken: String;
  ingredients: ingredient[];
  preferences: preferences;
  subscription: String;
}

const testing: ingredient = {
  name: "Bawang Goreng",
  quantity: 2,
  unit: "gram",
  expiryDate: new Date(),
  dateAdded: new Date(),
  type: ingredientTypes["Herbs and Spices"],
};

export default function App() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [userData, setUserData] = useState<userDataProps>();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "746895610022-8vssk9oqlglohdvj4m6hgc4oljpa69ck.apps.googleusercontent.com",
    iosClientId:
      "746895610022-j07khkro48h1imfum80fu1o1dr7ndkps.apps.googleusercontent.com",
    webClientId:
      "746895610022-tfkvvdm4ps5t8r1b1cs7pdmvv3rprn35.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response]);

  async function handleEffect() {
    const user = await getLocalUser();
    setUserInfo(user);

    if (!user) {
      console.log("No user detected in local storage 😡");
      if (response?.type === "success") {
        await getUserInfo(response?.authentication?.accessToken);
      }
    } else {
      console.log("Previous user detected in local storage ✅");

      getUserData(user);

      <Redirect href="/ " />;
    }
  }

  const getLocalUser = async () => {
    const data: any = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token: string | undefined) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);

      // Get user data from Firebase
      console.log("Authenticating user... 🚜");
      await getUserData(user);
    } catch (error) {
      console.log(error);
    }
  };

  if (userInfo) {
    return <Redirect href="/HomeScreen" />;
  }

  const getUserData = async (user: any) => {
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
      const localUserData: userDataProps = {
        name: user.name,
        email: user.email,
        googleToken: `${user.id}`,
        ingredients: [],
        preferences: { diet: [], cuisine: [] },
        subscription: "Regular",
      };

      setUserData(localUserData);

      const createUserResponse = await fetch(
        "https://us-central1-recipict-gcp.cloudfunctions.net/function-create-user",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(localUserData),
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
  };

  return (
    <View style={styles.container}>
      {!userInfo ? (
        <TouchableOpacity
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        >
          <Text>Sign in with Google</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.card}>
          {userInfo?.picture && (
            <Image source={{ uri: userInfo?.picture }} style={styles.image} />
          )}
          <Text style={styles.text}>Email: {userInfo.email}</Text>
          <Text style={styles.text}>
            Verified: {userInfo.verified_email ? "yes" : "no"}
          </Text>
          <Text style={styles.text}>Name: {userInfo.name}</Text>
          <Text style={styles.text}>{JSON.stringify(userInfo, null, 2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});