import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native";
import { Image } from "expo-image";
import OptionCard from "../components/OptionCard";
import { Redirect } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useContext } from "react";
import { UserContext } from "../userContext";

export default function profile() {
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
  const { userData, setUserData } = useContext(UserContext);
  if(!userData)return <Redirect href="/" />;
  const handlePreference = async () => {
    const name = "apple";
    const CategoryResponse = await fetch(
      `https://us-central1-recipict-gcp.cloudfunctions.net/function-ingredient-classifier-py?name=${name}`,
      {
        method: "GET",
        mode: "cors",
      }
    );

    const data = await CategoryResponse.json();
    console.log(data.category);
  };

  const handleAppereance = () => {};
  const handleNotification = () => {};
  const handleLocation = () => {};
  const handleAboutUs = () => {};

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("@user");
    setUserData(null);
    console.log("Logging out");
  };

  // if (shouldRedirect) {
  //   return <Redirect href="/" />;
  // }

  return (
    <SafeAreaView className="bg-white ">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Screen */}
        <View className="min-h-screen items-center mt-8">
          {/* Header */}
          <View className="w-11/12 rounded-2xl bg-green  justify-center shadow-lg">
            <Image
              className="w-[150px] h-[125px] ratio absolute rotate-2 left-[-30px] top-[-41]"
              contentFit="contain"
              source={require("../assets/images/Salady.png")}
            />
            {/* Name */}
            <Text className="font-pps text-xl text-white py-[14] ml-[115]">
              Hi, Daricky
            </Text>
          </View>

          {/* Options */}
          <View
            className="w-10/12 items-center justify-center mt-12 flex"
            style={{ gap: 12 }}
          >
            <OptionCard title="Preference" icon="" func={handlePreference} />
            <OptionCard title="Appereance" icon="" func={handleAppereance} />
            <OptionCard
              title="Notification"
              icon=""
              func={handleNotification}
            />
            <OptionCard title="Location" icon="" func={handleLocation} />
            <OptionCard title="About us" icon="" func={handleAboutUs} />
            <OptionCard title="Log out" icon="" func={handleLogOut} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
