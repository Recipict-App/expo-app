import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { Tabs } from "expo-router/tabs";
import { Image } from "expo-image";
import { useEffect } from "react";
import axios from "axios";
import { SheetProvider } from "react-native-actions-sheet";
import "../sheets.tsx";

export default function HomeLayout() {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const baseURL = "http://localhost:3000";
  const fetchUser = async () => {
    try {
      await axios({
        method: "get",
        url: `http://localhost:3000/users`,
        params: {
          _id: "658d204b86ebeac0fcf45729",
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
          console.log("Failed to get user data");
        });
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SheetProvider>
      <Tabs
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#1BD15D",
          tabBarActiveBackgroundColor: "#E8FBED",
          tabBarInactiveTintColor: "#C4C4C4",
          // tabBarStyle: { borderTopWidth: 0},
        }}
      >
        <Tabs.Screen
          name="HomeScreen"
          options={{
            tabBarIcon: () => (
              <Image
                className="w-[20px] h-[20px]"
                source={require("../assets/icons/Home.svg")}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="PantryScreen"
          options={{
            tabBarIcon: () => (
              <Image
                className="w-[20px] h-[20px]"
                source={require("../assets/icons/Pantry.svg")}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="ScanScreen"
          options={{
            tabBarIcon: () => (
              <Image
                className="w-[100px] h-[100px]"
                source={require("../assets/icons/Add.svg")}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="RecipeScreen"
          options={{
            tabBarIcon: () => (
              <Image
                className="w-[20px] h-[20px]"
                source={require("../assets/icons/Recipe.svg")}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="ProfileScreen"
          options={{
            tabBarIcon: () => (
              <Image
                className="w-[20px] h-[20px]"
                style={{ resizeMode: "contain" }}
                source={require("../assets/icons/Profile.svg")}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SheetProvider>
  );
}
