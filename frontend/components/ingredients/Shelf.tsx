import { View, Text } from "react-native";
import React from "react";
import { Ingredient } from "./Ingredient";
import { ingredientType } from "../../types/firebase-type";

export interface ShelfProps {
  category: string;
  ingredients: ingredientType[];
  mode?: string;
}

export const Shelf: React.FC<ShelfProps> = ({
  category,
  ingredients,
  mode,
}) => {
  return (
    <View className="w-11/12 mt-3">
      <Text
        numberOfLines={1}
        className="text-[#5cd358] text-lg font-pps mb-2 max-w-[300px]"
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
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              unit={item.unit}
              daysBeforeExpired={item.daysBeforeExpired}
              productCode={item.productCode}
              dateAdded={item.dateAdded}
              type={item.type}
              genericName={item.genericName}
              mode={mode ? mode : "normal"}
            />
          );
        })}
      </View>
    </View>
  );
};
