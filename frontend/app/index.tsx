import React, { useState, useEffect } from "react";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";

import { Redirect } from "expo-router";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

import { useContext } from "react";
import { UserContext } from "../userContext";

import {
  ingredientTypes,
  subscriptionTypes,
  ingredientProps,
  preferences,
  userDataProps,
} from "../firebase-type";

WebBrowser.maybeCompleteAuthSession();

const testing: ingredientProps = {
  name: "Bawang Goreng",
  quantity: 2,
  unit: "gram",
  expiryDate: new Date(),
  dateAdded: new Date(),
  type: ingredientTypes.HerbsAndSpices,
};

export default function App() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const { userData, setUserData } = useContext(UserContext);
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
      // <Redirect href="/ " />;
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

  if (userData) {
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
      <Image
        style={{
          zIndex: 4,
          position: "absolute",
          right: -40,
          top: 0,
          width: 143,
          height: 132,
          transform: [{ rotate: "20deg" }],
        }}
        contentFit="contain"
        source={require("../assets/images/Orangy.png")}
      />

      <Image
        style={{
          zIndex: 4,
          position: "absolute",
          left: -58,
          top: -80,
          width: 171,
          height: 171,
          transform: [{ scaleX: -1 }],
        }}
        contentFit="contain"
        source={require("../assets/images/Bowl.png")}
      />

      <Image
        style={{
          zIndex: 2,
          position: "absolute",
          left: -50,
          top: 65,
          width: 440,
          height: 440,
        }}
        contentFit="contain"
        source={require("../assets/images/Blob1.svg")}
      />

      <Image
        style={{
          zIndex: 3,
          position: "absolute",
          right: -430,
          top: -140,
          width: 600,
          height: 600,
        }}
        contentFit="contain"
        source={require("../assets/images/Blob2.svg")}
      />

      <Image
        style={{
          zIndex: 4,
          position: "absolute",
          right: -60,
          top: 320,
          width: 171,
          height: 171,
          transform: [{ rotate: "-45deg" }],
        }}
        contentFit="contain"
        source={require("../assets/images/Burgery.png")}
      />

      <View className="z-10 absolute top-[230] left-[25]">
        <Text className="font-pps text-4xl text-left">GET READY TO</Text>
        <Text className="font-ppb text-4xl text-left">DISCOVER</Text>
      </View>

      <Image
        style={{
          zIndex: 0,
          position: "absolute",
          left: 40,
          top: 440,
          width: 130,
          height: 130,
          transform: [{ rotate: "-190deg" }],
        }}
        contentFit="contain"
        source={require("../assets/images/Satay.png")}
      />

      {!userInfo ? (
        <View className="z-5 absolute bottom-[100] space-y-4">
          {/* Sign in  */}
          <TouchableOpacity
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          >
            <View className="flex w-[319px] h-[72px] left-0 top-0 bg-green rounded-3xl justify-center">
              <Text className="pl-6 text-white text-base font-ppr">
                Sign In
              </Text>
            </View>
          </TouchableOpacity>

          {/* Sign up  */}
          <TouchableOpacity
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          >
            <View className="flex w-[319px] h-[72px] left-0 top-0 rounded-3xl justify-center border-green border-[1px]">
              <Text className="pl-6 text-green text-base font-ppr">
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={{ zIndex: 6 }}
          className="absolute bottom-[200] space-y-4"
        />
      )}

      <Image
        style={{
          zIndex: 6,
          position: "absolute",
          right: -50,
          bottom: -40,
          width: 200,
          height: 200,
          transform: [{ rotate: "-55deg" }],
        }}
        contentFit="contain"
        source={require("../assets/images/Salady.png")}
      />

      <Image
        style={{
          zIndex: 6,
          position: "absolute",
          left: -15,
          bottom: -15,
          width: 150,
          height: 150,
          transform: [{ rotate: "30deg" }],
        }}
        contentFit="contain"
        source={require("../assets/images/Purply.png")}
      />
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
