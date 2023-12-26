import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { View, Text, ScrollView, FlatList, Button, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
export default function RecipeIngredientSheet(props: SheetProps) {
  return (
    <ActionSheet id={props.sheetId}>
      <View className=" max-h-[80%] h-fit flex items-center gap-4 px-5 py-2">
        <View
          style={{
            width: 124,
            height: 4,
            borderRadius: 10,
            backgroundColor: "#9F9F9F",
          }}
        />
        <Text className="font-pps text-2xl">Eggs with Tomato</Text>
        {/* Image */}
        <View className=" bg-grey w-4/5 h-1/3 rounded-2xl"></View>
        {/* Summary */}
        <View className="w-full flex flex-row ">
          {/* Ingredients */}
          <View className=" flex h-[300px] w-[200px] items-center p-3">
            <Text className="font-pps text-lg">Ingredients:</Text>
            <FlatList
              data={dummyIngredients}
              renderItem={({ item }) => (
                <View className="flex w-4/5 flex-row mx-2">
                  <Text className="font-ppr text-base">- </Text>
                  <Text className="font-ppr text-base">{item}</Text>
                </View>
              )}
              showsVerticalScrollIndicator={true}
            />
          </View>
          {/* General Information */}
          <View className=" flex h-full w-[200px] space-y-2 p-3">
            <Text className="font-pps text-base">Duration:</Text>
            <Text className="font-ppr text-base">50 minutes</Text>
            <Text className="font-pps text-base">Calories: </Text>
            <Text className="font-ppr text-base">20 kcal</Text>
            <Text className="font-pps text-base">Equipment(s): </Text>
            <Text className="font-ppr text-base">Pan, Wok</Text>
          </View>
        </View>
        <View
          className="flex w-full h-[40] justify-center items-center"
          style={{ bottom: -10, left: 0 }}
        >
          <TouchableOpacity
            className="flex min-w-full bg-green min-h-full justify-center items-center rounded-2xl"
            style={{ width: 100 }}
            onPress={() => {
              console.log("pressed!");
            }}
          >
            <Text className="font-pps text-white text-lg">
              See Instructions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
}
