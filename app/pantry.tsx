import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";

export default function pantry() {
  return (
    <View>
      <Text>pantry</Text>
      <Image
        className="w-[181px] h-[174px] absolute right-[-30px] top-[-90px]"
        style={{ resizeMode: "contain" }}
        source={require("../assets/images/Bowl.png")}
      />
    </View>
  );
}
