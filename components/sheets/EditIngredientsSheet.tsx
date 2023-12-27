import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { View, Text, ScrollView, FlatList, Button, Alert } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SheetManager } from "react-native-actions-sheet";
import { Image } from "expo-image";

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
export default function EditIngredientSheet(props: SheetProps) {
  return (
    <ActionSheet id={props.sheetId}>
      <View
        className=" h-[35%] flex items-center px-5 py-2"
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
        <View className="flex justify-between flex-row w-full h-full">

          {/*Left Column*/}
          <View
            className="flex w-[45%] h-[60px] rounded-2xl"
            style={{ gap: 10 }}
          >
            <Text className=" font-pps">Name:</Text>
            <TextInput
              className=" flex justify-center items-center font-ppr text-sm w-full bg-[#F8F8F6] rounded-xl h-full pl-2"
              multiline
              placeholder="Ingredient Name"
            />
            <Text className=" font-pps">Expiry Date:</Text>
            <TextInput
              className=" flex justify-center items-center font-ppr text-sm w-full bg-[#F8F8F6] rounded-xl h-full pl-2"
              multiline
              placeholder="DD/MM/YYYY"
            />
          </View>

          {/*Right Column*/}
          <View className="flex w-[45%] h-[60px] rounded-2xl" style={{gap: 10}}>
            <Text className=" font-pps">Quantity:</Text>
            <TextInput
              className=" flex justify-center items-center font-ppr text-sm w-full bg-[#F8F8F6] rounded-xl h-full pl-2"
              multiline
              placeholder="Number"
            />
            
          </View>
        </View>
      </View>
    </ActionSheet>
  );
}
