import React, { useEffect, useState } from "react";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import {
  getOrCreateUserDataInFirebase,
  getLocalUser,
  setLocalUser,
  getGoogleAccountDetails,
} from "../api/DatabaseFunctions";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";

import { Redirect } from "expo-router";

import { useContext } from "react";
import { UserContext } from "../userContext";

WebBrowser.maybeCompleteAuthSession();

/* Firebase SDK */
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';



export default function App() {
  /* Firebase SDK */
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<any>();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
``
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  // If user is already logged in, redirect to HomeScreen
  if (user) return <Redirect href="/HomeScreen" />;

  /* -------------------------------------- */

  const { userInfo, setUserInfo, userData, setUserData } =
    useContext(UserContext);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "746895610022-8vssk9oqlglohdvj4m6hgc4oljpa69ck.apps.googleusercontent.com",
    iosClientId:
      "746895610022-j07khkro48h1imfum80fu1o1dr7ndkps.apps.googleusercontent.com",
    webClientId:
      "746895610022-tfkvvdm4ps5t8r1b1cs7pdmvv3rprn35.apps.googleusercontent.com",
  });
  ``;
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

      await getOrCreateUserDataInFirebase(user, setUserData);
      // <Redirect href="/ " />;
    }
  }

  const getUserInfo = async (accessTokenGoogle: string | undefined) => {
    if (!accessTokenGoogle) return;

    try {
      // Set user info to local storage
      const user = await getGoogleAccountDetails(accessTokenGoogle);
      await setLocalUser(user, setUserInfo);
      console.log("User Info: ", user);

      // Get user data from Firebase
      console.log("Authenticating user... 🚜");
      await getOrCreateUserDataInFirebase(user, setUserData);
    } catch (error) {
      console.log(error);
    }
  };

  // If user is already logged in, redirect to HomeScreen
  if (userData) return <Redirect href="/HomeScreen" />;

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
          width: 200,
          height: 200,
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
          width: 400,
          height: 400,
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
          top: 400,
          width: 130,
          height: 130,
          transform: [{ rotate: "-190deg" }],
        }}
        contentFit="contain"
        source={require("../assets/images/Satay.png")}
      />

      {!userInfo ? (
        <View className="z-5 absolute bottom-[130] space-y-4">
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
          left: -10,
          bottom: -10,
          width: 130,
          height: 130,
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
