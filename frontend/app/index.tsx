import React, { useState, useEffect } from "react";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";

import { Redirect } from "expo-router";

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
  const [token, setToken] = useState<string | undefined>("");
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
  }, [response, token]);

  console.log("userInfo ->  " + userInfo);

  async function handleEffect() {
    const user = await getLocalUser();
    if (!user) {
      if (response?.type === "success") {
        setToken(response?.authentication?.accessToken);
        await getUserInfo(response?.authentication?.accessToken);
        await getUserData(response?.authentication?.accessToken);
      }
    } else {
      console.log("Google has your token");

      setUserInfo(user);
      await getUserData(user.id);

      console.log(userData);
      console.log("previous session user detected: redirecting to home screen");

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
      console.log("user: ", userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  if (userInfo) {
    return <Redirect href="/HomeScreen" />;
  }

  const logoutUser = async () => {
    await AsyncStorage.removeItem("@user");
    const user = await getLocalUser();
    setUserInfo(user);
    console.log("user: " + user);
  };

  const getUserData = async (tokenTest: String | undefined) => {
    console.log("Finding user...");
    const response = await fetch(
      "https://us-central1-recipict-gcp.cloudfunctions.net/function-retrieve-user",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: tokenTest }),
      }
    );
    console.log(response.status);
    if (response.status == 404) {
      // while(!userInfo){}
      console.log("What the user is not there!");
      console.log(userInfo);

      const localUserData: userDataProps = {
        name: userInfo.name,
        email: userInfo.email,
        googleToken: `${userInfo.id}`,
        ingredients: [],
        preferences: { diet: [], cuisine: [] },
        subscription: "Regular",
      };
      
      console.log("Not Found");
      setUserData(localUserData);

      const response = await fetch(
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

      console.log("Added User: " + localUserData);
    } else {
      console.log("User Found!");

      const user = await response.json();
      const userDatabase = user.userData;

      await setUserData(userDatabase);
      
      console.log("user database: "+ userDatabase);
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
      <TouchableOpacity onPress={logoutUser}>
        <Text>Clear local storage</Text>
      </TouchableOpacity>
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
