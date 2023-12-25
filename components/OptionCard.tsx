import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React from "react";

interface OptionCardProps {
  title: string;
  icon: string;
  func: () => void;
}

export default function OptionCard({ title, icon, func }: OptionCardProps) {
  return (
    <TouchableOpacity style={{ width: "100%" }}>
      <View className="w-full h-[72px] rounded-3xl bg-[#F8F8F6] flex-row pl-[20px] items-center justify-between">
        <View className="flex-row">
          {/* Image placeholder */}
          <View className="bg-[#9B9B9B] rounded-lg h-8 w-8 justify-center items-center" />

          {/* Text */}
          <Text numberOfLines={1} className="text-sm font-pps ml-4 py-1">
            {title}
          </Text>
        </View>

        {/* Arrow */}
        <Image
          className="flex w-[6px] h-[10px] object-contain mr-7"
          source={require("../assets/icons/Arrow.svg")}
        />
      </View>
    </TouchableOpacity>
  );
}
