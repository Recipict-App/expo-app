import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useState } from "react";
import HomeScreen from './HomeScreen';
import Index from './index';
import oauthredirect from './oauthredirect';
import PantryScreen from './PantryScreen';
import ProfileScreen from './ProfileScreen';
import ScanScreen from './ScanScreen';
import RecipeScreen from './RecipeScreen';

import { Tabs } from "expo-router/tabs";
import { Image } from "expo-image";

import { SheetProvider } from "react-native-actions-sheet";
import "../sheets.tsx";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function HomeLayout() {
  const Tab = createBottomTabNavigator();
  const [userData, setUserData] = useState<any>();
  

  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SheetProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#1BD15D",
          tabBarActiveBackgroundColor: "#E8FBED",
          tabBarInactiveTintColor: "#C4C4C4",
          // tabBarStyle: { borderTopWidth: 0},
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          options={{
            tabBarIcon: () => (
              <Image
                className="w-[20px] h-[20px]"
                source={require("../assets/icons/Home.svg")}
              />
            ),
          }}
        >
          {() => <HomeScreen />}
        </Tab.Screen>
        <Tab.Screen
          name="PantryScreen"
          component={PantryScreen}
          options={{
            tabBarIcon: () => (
              <Image
                className="w-[20px] h-[20px]"
                source={require("../assets/icons/Pantry.svg")}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ScanScreen"
          component={ScanScreen}
          options={{
            tabBarIcon: () => (
              <Image
                className="w-[100px] h-[100px]"
                source={require("../assets/icons/Add.svg")}
              />
            ),
          }}
        />
        <Tab.Screen
          name="RecipeScreen"
          component={RecipeScreen}
          options={{
            tabBarIcon: () => (
              <Image
                className="w-[20px] h-[20px]"
                source={require("../assets/icons/Recipe.svg")}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
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

        <Tab.Screen
          name="index"
          component={Index}
          options={{
            href: null,
            // tabBarStyle: { display: "none" }, // hide for development
          }}
        />

        {/* <Tab.Screen
          name="oauthredirect"
          component={oauthredirect}
          options={{
            href: null,
          }}
        /> */}
      </Tab.Navigator>
    </SheetProvider>
  );
}
