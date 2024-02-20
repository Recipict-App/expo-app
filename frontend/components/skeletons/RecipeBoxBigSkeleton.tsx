import { View } from "react-native";
import React from "react";

import { SkeletonSimpler } from "react-native-skeleton-simpler";

export default function RecipeBoxBigSkeleton() {
  return (
    <SkeletonSimpler
      loading={true}
      layout={[{ width: 128, height: 210, borderRadius: 16, margin: 5}]}
      theme="dark"
    >
      <View />
    </SkeletonSimpler>
  );
}
