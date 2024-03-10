import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function SelectableBox({ label, isSelected, onToggle }: any) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      className="bg-grey items-center justify-center py-1 px-1"
    >
      <View
        className={`px-4 py-3 max-w-fit rounded-3xl items-center justify-center  flex ${
          isSelected ? "bg-green" : "bg-white border border-green"
        }`}
      >
        <Text
          className={`font-pps text-base max-w-fit ${
            isSelected ? "text-white" : "text-green"
          }`}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
