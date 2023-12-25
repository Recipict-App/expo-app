import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { Tabs } from "expo-router/tabs";
import { Image } from "expo-image";
import { View } from "react-native";

export default function HomeLayout() {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#1BD15D",
        tabBarActiveBackgroundColor: "#E8FBED",
        tabBarInactiveTintColor: "#C4C4C4",
      }}
    >
      <Tabs.Screen
        name="home"
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
        name="pantry"
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
        name="scan"
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
        name="recipe"
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
        name="profile"
        options={{
          tabBarIcon: () => (
            <Image
              className="w-[20px] h-[20px]"
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
  );
}
