import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { View, Text, ScrollView, FlatList, Button, Alert } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SheetManager } from "react-native-actions-sheet";
import { Image } from "expo-image";

import { ingredientProps } from "../../app/index";
import { ingredientTypes } from "../../app/index";
import { useState } from "react";

const dummyIngredients = [
  "Garlic",
  "Chili",
  "Rice",
  "Dany",
  "Other spices idk what but a long one",
  "Recipict",
  "Purply",
  "Orangy",
  "Bowly",
  "Satay",
];

const handleCloseEdit = () => {
  SheetManager.hide("edit-ingredients-sheet");
};
export default function EditIngredientSheet(
  props: SheetProps<{
    name: string;
    quantity: number;
    unit: string;
    expiryDate: Date;
    dateAdded: Date;
    type: ingredientTypes;
  }>
) {
  const ingredient = props.payload;
  if (!ingredient) return null;
  const [nameSheet, setNameSheet] = useState<string>(ingredient.name);
  const [quantitySheet, setQuantitySheet] = useState<number>(
    ingredient.quantity
  );
  const [expirySheet, setExpirySheet] = useState<Date>(ingredient.expiryDate);

  const handleChangeName = (e: any) => {
    setNameSheet(e.target.value);
  };

  return (
    <ActionSheet id={props.sheetId}>
      <View
        className=" h-[42%] flex items-center px-5 py-2"
        style={{ gap: 25 }}
      >
        <View
          style={{
            width: "50%",
            height: 4,
            borderRadius: 10,
            backgroundColor: "#9F9F9F",
          }}
        >
          <TouchableOpacity
            className=" min-h-full min-w-full"
            onPress={handleCloseEdit}
          />
        </View>
        <View className="flex justify-between flex-row w-full h-fit">
          {/*Left Column*/}
          <View className="flex w-[45%] h-full rounded-2xl" style={{ gap: 10 }}>
            <Text className=" font-pps">Name:</Text>
            <TextInput
              className=" flex justify-center items-center font-ppr text-sm w-full bg-[#F8F8F6] rounded-xl h-[60px] pl-2"
              multiline
              placeholder="Ingredient Name"
              onChange={handleChangeName}
              value={nameSheet}
            />
            <Text className=" font-pps">Expiry Date:</Text>
            <TextInput
              className=" flex justify-center items-center font-ppr text-sm w-full bg-[#F8F8F6] rounded-xl h-[60px] pl-2"
              multiline
              placeholder="DD/MM/YYYY"
              value={props.payload?.expiryDate.slice(0, 10)}
            />
          </View>

          {/*Right Column*/}
          <View className="flex w-[45%] h-full" style={{ gap: 10 }}>
            <View className="w-full" style={{ gap: 10 }}>
              <Text className=" font-pps">Quantity:</Text>
              <TextInput
                className=" flex justify-center items-center font-ppr text-sm w-full bg-[#F8F8F6] rounded-xl h-[60px] pl-2"
                multiline
                placeholder="Number"
                value={props.payload?.quantity.toString()}
              />
            </View>
            <View className="w-full" style={{ gap: 10 }}>
              <Text className=" font-pps">Type:</Text>
              <TextInput
                className=" flex justify-center items-center font-ppr text-sm w-full bg-[#F8F8F6] rounded-xl h-[60px] pl-2"
                multiline
                placeholder="Type"
                value={props.payload?.type.toString()}
              />
            </View>
          </View>
        </View>
        <View
          className="flex flex-row w-full justify-center items-end "
          style={{ gap: 50 }}
        >
          <TouchableOpacity onPress={handleCloseEdit}>
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../../assets/icons/DeleteIngredient.svg")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseEdit}>
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../../assets/icons/Approve.svg")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
}
