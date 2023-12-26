import React from "react";
import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native";
import { Image } from "expo-image";
import OptionCard from "../components/OptionCard";
import { SheetManager } from "react-native-actions-sheet";

export default function profile() {
  const handlePreference = () => {
    SheetManager.show("scanned-items-sheet");
  };

  const handleAppereance = () => {};
  const handleNotification = () => {};
  const handleLocation = () => {};
  const handleAboutUs = () => {};

  return (
    <SafeAreaView className="bg-white ">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Screen */}
        <View className="min-h-screen items-center mt-8">
          {/* Header */}
          <View className="w-11/12 rounded-2xl bg-green  justify-center shadow-lg">
            <Image
              className="w-[150px] h-[125px] ratio absolute rotate-2 left-[-30px] top-[-41]"
              style={{ resizeMode: "contain" }}
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
