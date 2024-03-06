import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function SelectableBox({ label, isSelected, onToggle }: any) {
  return (
    <TouchableOpacity onPress={onToggle} className="" style={{alignSelf: "flex-start"}}>
      <View
        className={`px-4 py-3 rounded-3xl items-center justify-center ${
          isSelected ? "bg-green" : "bg-white border border-green"
        }`}

      >
        <Text
          className={`font-pps text-base ${
            isSelected ? "text-white" : "text-green"
          }`}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
