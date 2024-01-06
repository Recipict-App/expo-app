import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { Tabs } from "expo-router/tabs";
import { Image } from "expo-image";

import { SheetProvider } from "react-native-actions-sheet";
import "../sheets.tsx";
import { useState } from "react";
import { UserContext } from "../userContext";
import { ingredientProps, userDataProps } from "../firebase-type";
import { Redirect } from "expo-router";

export default function HomeLayout() {
  const [userData, setUserData] = useState<userDataProps[]>();
  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
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
                  contentFit="contain"
                  source={require("../assets/icons/Profile.svg")}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="index"
            options={{
              href: null,
              // tabBarStyle: { display: "none" }, // comment for development
            }}
          />

          <Tabs.Screen
            name="oauthredirect"
            options={{
              href: null,
            }}
          />
        </Tabs>
      </SheetProvider>
    </UserContext.Provider>
  );
}
