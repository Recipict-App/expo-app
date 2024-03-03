import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { View, Text, FlatList, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SheetManager } from "react-native-actions-sheet";
import { Image } from "expo-image";
import { useWindowDimensions } from "react-native";
import { recipeType } from "../../types/recipe-type";

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
        <View className="flex max-h-[8vh] w-full mt-6 px-4">
          <Text
            className="w-full font-pps text-xl text-center"
            adjustsFontSizeToFit
          >
            {props.payload?.recipe.title}
          </Text>
        </View>

        {/* Image */}
        <View className="w-full h-1/3 rounded-2xl overflow-hidden justify-center items-center my-6">
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

            <Text className="ml-1 font-pps text-base text-[#5A58B5]">
              {props.payload?.recipe.readyInMinutes || "-"} Mins
            </Text>
          </View>

          <View className="h-[50px] w-fit bg-[#A4C893] rounded-2xl flex-row items-center px-2 ">
            <Image
              style={{ width: 32, height: 32 }}
              source={require("../../assets/icons/People.svg")}
            />
            <Text className="ml-1 font-pps text-base text-[#55674D]">
              {props.payload?.recipe.servings || "-"}
            </Text>
          </View>

          <View className="h-[50px] w-fit bg-[#F3F6C8] rounded-2xl flex-row items-center px-2">
            <Image
              style={{ width: 32, height: 32 }}
              source={require("../../assets/icons/Fire.svg")}
            />
            <Text className="ml-1 font-pps text-base text-[#949143]">
              {props.payload?.recipe.calories || "-"} Cals
            </Text>
          </View>
        </View>

        {/* Summary */}

        <View className="w-full mt-6 px-1">
          <ScrollView style={{ height: 180 }}>
            <Text className="font-pp text-justify text-lg leading-6">
              {props.payload?.recipe.Cleanedsummary}
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  };

  const IngredientSlide: React.FC = () => {
    return (
      <View className="h-full flex items-center px-6" style={{ width: width }}>
        {/* Ingredient  */}
        <Text className="font-pps text-xl text-center mt-6 px-4 mb-3">
          Ingredients
        </Text>

        {/* items */}
        <View className="w-full h-5/6 flex flex-row justify-between px-2">
          <FlatList
            data={props.payload?.recipe.totalIngredients}
            renderItem={({ item, index }) => {
              return (
                <View className="bg-[#F8F8F6] w-full rounded-md  flex-row items-center mt-2">
                  <View className="rounded-l-md h-full w-[3px] bg-grey"></View>
                  <Text className="ml-1 text-sm text-[#5A58B5] px-1 py-1">
                    ({item.amount} {item.unit}){" "}
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
                <View className="bg-[#F8F8F6] w-full rounded-md flex-row items-center mt-2">
                  <View className="rounded-l-md h-full w-1/12 py-1 bg-green items-center">
                    <Text className="text-white text-base font-ppb">
                      {index}
                    </Text>
                  </View>

                  <Text className="w-5/6 ml-3 text-sm font-medium text-green py-2 text-justify">
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
      <View className="w-full h-fit min-h-[70%] py-2 items-center rounded-xl">
        {/* top bar */}
        <View
          style={{
            width: "50%",
            height: 4,
            borderRadius: 10,
            backgroundColor: "#9F9F9F",
          }}
        >
          <TouchableOpacity onPress={handleCloseRecipe} />
        </View>

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

        {/* footer */}
        <View className="flex w-full flex-row justify-center items-center space-x-8">
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
