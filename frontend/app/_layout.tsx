import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { Tabs } from "expo-router/tabs";
import { Image } from "expo-image";

import { SheetProvider } from "react-native-actions-sheet";
import "../sheets";

import { AppStateStatus, Platform } from "react-native";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { useOnlineManager } from "../hooks/useOnlineManager";
import { useAppState } from "../hooks/useAppState";

// todo: refactor these to a better place
import { useEffect, useState } from "react";
import { UserContext } from "../userContext";
import { ScannedIngredientsContext } from "../ScannedItemProvider";
import { userInfoType, userDataProps, ingredientProps } from "../firebase-type";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function RootLayout() {
  useOnlineManager();
  useAppState(onAppStateChange);

  const [userInfo, setUserInfo] = useState<userInfoType>();
  const [userData, setUserData] = useState<userDataProps[]>();

  const [scannedIngredients, setScannedIngredients] =
    useState<ingredientProps[]>();

  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider
        value={{
          userInfo,
          setUserInfo,
          userData,
          setUserData,
        }}
      >
        <ScannedIngredientsContext.Provider
          value={{ scannedIngredients, setScannedIngredients }}
        >
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
        </ScannedIngredientsContext.Provider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
