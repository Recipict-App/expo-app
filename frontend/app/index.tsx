import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../providers/userContext";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { Redirect } from "expo-router";

/* Firebase SDK */
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { userDataType } from "../types/firebase-type";

GoogleSignin.configure({
  webClientId:
    "719179759408-c0u3h5q204l5ra7inj33vrj5jp2h1rb8.apps.googleusercontent.com",
  iosClientId:
    "719179759408-5ps02vu55kqoktdoc2hb0ibninbb898p.apps.googleusercontent.com",
});

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  return auth().signInWithCredential(googleCredential);
}

export default function App() {
  const { userData, setUserData } = useContext(UserContext);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (user) loadUserData(user);
    if (initializing) setInitializing(false);
  }

  // Get user data from Firestore
  async function loadUserData(user: any) {
    try {
      const doc = await firestore().collection("users").doc(user.uid).get();
      if (doc.exists) {
        const data = doc.data() as userDataType;
        // console.log("User Data:", data);
        setUserData(data);
        return data;
      } else {
        console.log("User Not Found in Firestore!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  // If user is already logged in, redirect to HomeScreen
  if (user) {
    // console.log(user.uid);
    // loadUserData(user);
    return <Redirect href="/HomeScreen" />;
  }

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
          zIndex: 20,
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

      <View className="z-5 absolute bottom-[130] space-y-4 z-10">
        {/* Sign in  */}
        <TouchableOpacity
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log("Signed in with Google!")
            )
          }
        >
          <View className="flex w-[319px] h-[72px] left-0 top-0 bg-green rounded-3xl justify-center">
            <Text className="pl-6 text-white text-base font-ppr">Sign In</Text>
          </View>
        </TouchableOpacity>

        {/* Sign up  */}
        <TouchableOpacity
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log("Signed in with Google!")
            )
          }
        >
          <View className="flex w-[319px] h-[72px] left-0 top-0 rounded-3xl justify-center border-green border-[1px]">
            <Text className="pl-6 text-green text-base font-ppr">Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>

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