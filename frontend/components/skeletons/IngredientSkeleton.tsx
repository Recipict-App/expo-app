import { View } from "react-native";
import React from "react";

import { SkeletonSimpler } from "react-native-skeleton-simpler";

export default function IngredientSkeleton() {
  return (
    <View className="w-full h-[72px] rounded-3xl bg-[#F8F8F6] flex-row pl-[20px] items-center justify-between">
      <SkeletonSimpler
        loading={true}
        layout={[{ width: 32, height: 32, borderRadius: 8 }]}
      >
        <View />
      </SkeletonSimpler>
      <SkeletonSimpler
        containerStyle={{
          flex: 1,
          marginLeft: -200,
          justifyContent: "center",
        }}
        loading={true}
        layout={[
          { width: 120, height: 16, marginBottom: 6, borderRadius: 6 },
          { width: 160, height: 14, borderRadius: 6 },
        ]}
      >
        <View />
      </SkeletonSimpler>
    </View>
  );
}
