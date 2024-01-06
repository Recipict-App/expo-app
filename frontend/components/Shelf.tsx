import { View, Text } from "react-native";
import React from "react";
import { Ingredient } from "../components/Ingredient";
import { ingredientProps } from "../firebase-type";

export interface ShelfProps {
  category: string;
  ingredients: ingredientProps[];
}

export const Shelf: React.FC<ShelfProps> = ({ category, ingredients }) => {
  return (
    <View className="w-11/12 mt-3">
      <Text
        numberOfLines={1}
        className="text-[#FE0303] text-lg font-pps mb-2 max-w-[300px]"
      >
        {category}
      </Text>

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
              unit={item.unit}
              expiryDate={item.expiryDate}
              dateAdded={item.dateAdded}
              type={item.type}
            />
          );
        })}
      </View>
    </View>
  );
};
