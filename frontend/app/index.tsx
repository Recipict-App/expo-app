import React, { useState, useEffect } from "react";

import { Redirect } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [token, setToken] = useState<string | undefined>("");
  const [userInfo, setUserInfo] = useState<any>(null);

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

  async function handleEffect() {
    const user = await getLocalUser();
    if (!user) {
      if (response?.type === "success") {
        setToken(response?.authentication?.accessToken);
        getUserInfo(response?.authentication?.accessToken);
      }
    } else {
      setUserInfo(user.email);
      console.log("previous session user detected");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
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
      console.log("user: " + user);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem("@user");
    const user = await getLocalUser();
    setUserInfo(user);
    console.log("user: " + user);
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
