import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { View, Text, FlatList, ScrollView, StyleSheet,TouchableOpacity } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { Image } from "expo-image";
import { useWindowDimensions } from "react-native";
import { recipeType } from "../../types/recipe-type";

import ReadMore from "@fawazahmed/react-native-read-more";

const handleCloseRecipe = () => {
  SheetManager.hide("recipe-ingredient-sheet");
};

export default function RecipeIngredientSheet(
  props: SheetProps<{
    recipe: recipeType;
  }>
) {
  let { width } = useWindowDimensions();

  const SummarySlide: React.FC = () => {
    return (
      <View className="h-full flex items-center px-6" style={{ width: width }}>
        {/* Title */}
        <View className="w-full mt-4">
          <Text
            className="w-full font-pps text-xl text-center"
            adjustsFontSizeToFit
          >
            {props.payload?.recipe.title}
          </Text>
        </View>
        {/* Image */}
        <View className="w-full h-2/5 rounded-2xl overflow-hidden justify-center items-center mb-6 mt-4">
          <Image
            className="w-[130%] h-[130%]"
            source={{ uri: props.payload?.recipe.image }}
            contentFit="contain"
          />
        </View>
        {/* STATS */}
        <View className="w-full flex flex-row justify-between px-2">
          <View className="h-[50px] w-fit bg-[#C9C8F6] rounded-2xl flex-row items-center px-2">
            <Image
              style={{ width: 32, height: 32 }}
              source={require("../../assets/icons/Clock.svg")}
            />

            <Text className="ml-1 font-medium text-base text-[#5A58B5]">
              {props.payload?.recipe.readyInMinutes || "-"} Mins
            </Text>
          </View>

          <View className="h-[50px] w-fit bg-[#A4C893] rounded-2xl flex-row items-center px-2 ">
            <Image
              style={{ width: 32, height: 32 }}
              source={require("../../assets/icons/People.svg")}
            />
            <Text className="ml-1 font-medium text-base text-[#55674D]">
              {props.payload?.recipe.servings || "-"}
            </Text>
          </View>

          <View className="h-[50px] w-fit bg-[#F3F6C8] rounded-2xl flex-row items-center px-2">
            <Image
              style={{ width: 32, height: 32 }}
              source={require("../../assets/icons/Fire.svg")}
            />
            <Text className="ml-1 font-medium text-base text-[#949143]">
              {props.payload?.recipe.calories || "-"} Cals
            </Text>
          </View>
        </View>
        {/* line */}
        <View className="w-[98%] border-b-[1px] my-4 border-b-grey" />
        {/* Summary */}
        <View className="w-full px-2">
          <ScrollView
            style={{ height: 200 }}
            showsVerticalScrollIndicator={false}
          >
            <Text className="font-semibold text-lg mb-1 tracking-wider">
              What's this?
            </Text>
            <ReadMore numberOfLines={5} style={SummaryStyle.textStyle}>
              {props.payload?.recipe.Cleanedsummary}
            </ReadMore>
          </ScrollView>
        </View>
      </View>
    );
  };

  const IngredientSlide: React.FC = () => {
    return (
      <View className="h-full flex items-center px-6" style={{ width: width }}>
        {/* Ingredient  */}
        <Text className="font-pps text-xl  mt-6 px-4 mb-3">Ingredients</Text>

        {/* items */}
        <View className="w-full h-5/6 flex flex-row justify-between px-2">
          <FlatList
            data={props.payload?.recipe.totalIngredients}
            renderItem={({ item, index }) => {
              return (
                <View className=" w-full rounded-md flex flex-row items-center ">
                  <Image
                    style={{ width: 34, height: 34 }}
                    source={require("../../assets/icons/CheckIcon.svg")}
                    className="mt-2"
                  />
                  <Text className="text-sm text-[#5A58B5] px-1 ">
                    ({item.amount.toString().substring(0, 5)} {item.unit}){" "}
                    <Text className="font-pps">{item.name}</Text>
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  };

  const InstructionSlide: React.FC = () => {
    return (
      <View className="h-full flex items-center px-6" style={{ width: width }}>
        {/* Instruction */}
        <Text className="font-pps text-xl text-center mt-6 px-4  pb-3">
          Steps
        </Text>

        {/* items */}
        <View className="w-full h-5/6 flex flex-row justify-between px-2">
          <FlatList
            data={props.payload?.recipe.instructions}
            renderItem={({ item, index }) => {
              return (
                <View className="w-full rounded-md flex-row items-center mt-3">
                  <View className="h-full items-center">
                    <View className="bg-green px-1 py-1 aspect-square rounded-full">
                      <Text className=" text-center font-pps text-white ">
                        {index + 1}
                      </Text>
                    </View>
                  </View>

                  <Text className="w-5/6 ml-3 text-sm leading-5 text-justify">
                    {item.step}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  };

  /* Rendered slides */
  const slides = ["SummarySlide", "IngredientSlide", "InstructionSlide"];

  return (
    <ActionSheet id={props.sheetId}>
      <View className="w-full h-fit min-h-[70%] max-h-[95%] py-2 pb-9 items-center rounded-xl  justify-between">
        {/* top bar */}
        <View
          style={{
            width: "20%",
            height: 4,
            borderRadius: 10,
            backgroundColor: "#9F9F9F",
          }}
        >
          <TouchableOpacity onPress={handleCloseRecipe} />
        </View>

        <View className="w-full">
          <FlatList
            horizontal
            data={slides}
            renderItem={({ item }) => {
              if (item === "SummarySlide") return <SummarySlide />;
              if (item === "IngredientSlide") return <IngredientSlide />;
              if (item === "InstructionSlide") return <InstructionSlide />;
              return <></>;
            }}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          />
        </View>

        {/* footer */}
        <View className="flex w-full flex-row justify-center items-center space-x-8 mt-2">
          {/* Close button */}
          <TouchableOpacity
            className="h-fit w-ful justify-center flex items-center"
            onPress={handleCloseRecipe}
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../../assets/icons/ExitButton.svg")}
            />
          </TouchableOpacity>

          {/* see instruction button */}
          <TouchableOpacity
            className="h-fit w-ful justify-center flex items-center"
            onPress={handleCloseRecipe}
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../../assets/icons/CookButton.svg")}
            />
          </TouchableOpacity>

          {/* Save button */}
          <TouchableOpacity
            className="h-fit w-ful justify-center flex items-center"
            onPress={handleCloseRecipe}
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../../assets/icons/SaveButton.svg")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
}

const SummaryStyle = StyleSheet.create({
  safe: {
    flex: 1,
  },
  root: {
    flex: 1,
    padding: 16,
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 25,
    color: "grey",
    paddingHorizontal: 2,
  },
});
