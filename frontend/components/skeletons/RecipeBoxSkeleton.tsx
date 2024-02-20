import { View } from "react-native";
import React from "react";

import { SkeletonSimpler } from "react-native-skeleton-simpler";

export default function RecipeBoxSkeleton() {
  return (
    <View className="h-[100]  rounded-3xl bg-[#F8F8F6]  items-center flex flex-row">
      <SkeletonSimpler

        loading={true}
        layout={[{ width: 80, height: 80, marginLeft: 20, borderRadius: 16 }]}
      >
        <View />
      </SkeletonSimpler>
      <SkeletonSimpler
        containerStyle={{
          flex: 1,
          marginLeft: -80
        }}
        loading={true}
        layout={[
          { width: 140, height: 16, marginBottom: 6,  borderRadius: 6 },
          { width: 100, height: 14, marginBottom: 6, borderRadius: 6 },
          { width: 72, height: 14, marginBottom: 6, borderRadius: 6 },

        ]}
      >
        <View />
      </SkeletonSimpler>
    </View>
  );
}