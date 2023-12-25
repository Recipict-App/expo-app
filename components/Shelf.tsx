import { View, Text } from "react-native";
import React from "react";
import { IngredientProps, Ingredient } from "../components/Ingredient";

export interface ShelfProps {
  category: string;
  ingredients: IngredientProps[];
}

export const Shelf: React.FC<ShelfProps> = ({ category, ingredients }) => {
  return (
    <View className="w-11/12 mt-3">
      <Text className="text-[#FE0303] text-lg font-pps mb-2">{category}</Text>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        {ingredients.map((item, index) => {
          return (
            <Ingredient
              key={index}
              name={item.name}
              quantity={item.quantity}
              duration={item.duration}
            />
          );
        })}
      </View>
    </View>
  );
};
