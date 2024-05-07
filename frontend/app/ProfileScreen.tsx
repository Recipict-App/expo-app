import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import OptionCard from "../components/OptionCard";
import { Redirect } from "expo-router";

import { UserContext } from "../userContext";
import { useContext } from "react";

import { SheetManager } from "react-native-actions-sheet";

import auth from "@react-native-firebase/auth";

export default function Profile() {
  const { userData, setUserData } = useContext(UserContext);
  if (!userData) return <Redirect href={"/"} />;
  const name = userData.name;

  const handlePreference = () => {
    SheetManager.show("preference-sheet");
  };
  const handleNotification = async () => {

  };
  const handleAboutUs = () => {};

  // const handleLocation = () => {};
  // const handleAppereance =  () => {};

  const handleLogOut = async () => {
    auth()
      .signOut()
      .then(() => {
        console.log("User signed out!");
        setUserData(undefined);
      });
  };

  return (
    <View className="bg-white ">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Screen */}
        <View className="min-h-screen items-center mt-20">
          {/* Header */}
          <View className="w-11/12 rounded-2xl bg-green  justify-center shadow-lg">
            <Image
              className="w-[150px] h-[125px] ratio absolute rotate-2 left-[-30px] top-[-41]"
              contentFit="contain"
              source={require("../assets/images/Salady.png")}
            />
            {/* Name */}
            <Text className="font-pps text-xl text-white py-[14] ml-[115]">
              Hi, {name}
            </Text>
          </View>

          {/* Options */}
          <View
            className="w-10/12 items-center justify-center mt-12 flex"
            style={{ gap: 12 }}
          >
            <OptionCard title="Preference" icon="" func={handlePreference} />
            {/* <OptionCard title="Appereance" icon="" func={handleAppereance} /> */}
            <OptionCard
              title="Notification"
              icon=""
              func={handleNotification}
            />
            {/* <OptionCard title="Location" icon="" func={handleLocation} /> */}
            <OptionCard title="About us" icon="" func={handleAboutUs} />
            <OptionCard title="Log out" icon="" func={handleLogOut} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
