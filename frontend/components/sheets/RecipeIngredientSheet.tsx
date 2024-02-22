import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { View, Text, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SheetManager } from "react-native-actions-sheet";
import { Image } from "expo-image";
import { useWindowDimensions } from "react-native";

const handleCloseRecipe = () => {
  SheetManager.hide("recipe-ingredient-sheet");
};

export default function RecipeIngredientSheet(
  props: SheetProps<{
    recipe: {
      name: String;
      imageURI: string;
      ingredients: any;
      duration: number;
      equipment: string[];
      calories: string;
    };
  }>
) {
  let { width } = useWindowDimensions();

  const SummarySlide: React.FC = () => {
    return (
      <View
        className=" flex items-center h-full justify-center"
        style={{ width: width }}
      >
        {/* Title */}
        <Text className="font-pps text-2xl text-center">
          {props.payload?.recipe.name}
        </Text>
        {/* Image */}
        <View className=" w-4/5 h-1/3 rounded-2xl overflow-hidden  justify-center">
          <Image
            className="w-[130%] h-[130%]"
            source={{ uri: props.payload?.recipe.imageURI }}
            contentFit="contain"
          />
        </View>
        {/* Summary */}
        <View className="w-full flex flex-row ">
          {/* Ingredients */}
          <View className=" flex h-[275px] w-[200px] items-center p-3">
            <Text className="font-pps text-lg">Ingredients:</Text>
            <FlatList
              data={props.payload?.recipe.ingredients}
              renderItem={({ item }) => (
                <View className="flex w-4/5 flex-row mx-2">
                  <Text className="font-ppr text-base">- </Text>
                  <Text className="font-ppr text-base">
                    {item.amount} {item.unit} {item.name}
                  </Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
          {/* General Information */}
          <View className="flex h-full w-[200px] space-y-2 p-3">
            <Text className="font-pps text-base">Duration:</Text>
            <Text className="font-ppr text-base">
              {props.payload?.recipe.duration
                ? props.payload?.recipe.duration + " minutes"
                : "Not Available"}
            </Text>
            <Text className="font-pps text-base">Cal/Serving: </Text>
            <Text className="font-ppr text-base">
              {props.payload?.recipe.calories
                ? props.payload?.recipe.calories + " cal"
                : "Not Available"}
            </Text>
            <Text className="font-pps text-base">Equipment(s): </Text>
            <Text className="font-ppr text-base">
              {props.payload?.recipe.equipment[0]
                ? props.payload?.recipe.equipment[0]
                : "None"}
            </Text>
          </View>
        </View>
        {/* footer */}
        <View className="flex h-[40] w-full flex-row justify-between items-center px-[20]">
          {/* close button */}
          <View
            className="flex w-[40] h-full justify-center items-center rounded-xl"
            style={{ backgroundColor: "#FFCCC5" }}
          >
            <TouchableOpacity
              className="min-w-full min-h-full justify-center flex items-center"
              onPress={handleCloseRecipe}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  position: "absolute",
                }}
                source={require("../../assets/icons/Exit.svg")}
              />
            </TouchableOpacity>
          </View>
          {/* see instruction button */}
          <View className="flex w-[70%] h-full items-center bg-green rounded-2xl">
            <TouchableOpacity
              className="flex min-w-full min-h-full justify-center items-center rounded-2xl"
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
      </View>
    );
  };

  const InstructionSlide: React.FC = () => {
    return (
      <View
        className=" flex items-center h-full justify-center"
        style={{ width: width }}
      >
        {/* Title */}
        <Text className="font-pps text-2xl text-center">
          sdcj ksd cvksdj cvdk
        </Text>
        {/* Image */}
        <View className=" w-4/5 h-1/3 rounded-2xl overflow-hidden  justify-center">
          <Image
            className="w-[130%] h-[130%]"
            source={{ uri: props.payload?.recipe.imageURI }}
            contentFit="contain"
          />
        </View>
        {/* Summary */}
        <View className="w-full flex flex-row ">
          {/* Ingredients */}
          <View className=" flex h-[275px] w-[200px] items-center p-3">
            <Text className="font-pps text-lg">Ingredients:</Text>
            <FlatList
              data={props.payload?.recipe.ingredients}
              renderItem={({ item }) => (
                <View className="flex w-4/5 flex-row mx-2">
                  <Text className="font-ppr text-base">- </Text>
                  <Text className="font-ppr text-base">
                    {item.amount} {item.unit} {item.name}
                  </Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
          {/* General Information */}
          <View className=" flex h-full w-[200px] space-y-2 p-3">
            <Text className="font-pps text-base">Duration:</Text>
            <Text className="font-ppr text-base">
              {props.payload?.recipe.duration
                ? props.payload?.recipe.duration + " minutes"
                : "Not Available"}
            </Text>
            <Text className="font-pps text-base">Cal/Serving: </Text>
            <Text className="font-ppr text-base">
              {props.payload?.recipe.calories
                ? props.payload?.recipe.calories + " cal"
                : "Not Available"}
            </Text>
            <Text className="font-pps text-base">Equipment(s): </Text>
            <Text className="font-ppr text-base">
              {props.payload?.recipe.equipment[0]
                ? props.payload?.recipe.equipment[0]
                : "None"}
            </Text>
          </View>
        </View>
        {/* footer */}
        <View className="flex h-[40] w-full flex-row justify-between items-center px-[20]">
          {/* close button */}
          <View
            className="flex w-[40] h-full justify-center items-center rounded-xl"
            style={{ backgroundColor: "#FFCCC5" }}
          >
            <TouchableOpacity
              className="min-w-full min-h-full justify-center flex items-center"
              onPress={handleCloseRecipe}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  position: "absolute",
                }}
                source={require("../../assets/icons/Exit.svg")}
              />
            </TouchableOpacity>
          </View>
          {/* see instruction button */}
          <View className="flex w-[70%] h-full items-center bg-green rounded-2xl">
            <TouchableOpacity
              className="flex min-w-full min-h-full justify-center items-center rounded-2xl"
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
      </View>
    );
  };

  /* Rendered slides */
  const slides = ["SummarySlide", "InstructionSlide"];

  return (
    <ActionSheet id={props.sheetId}>
      <View className="w-full h-fit min-h-[50%] py-2 px-5 bg-green">
        <View
          style={{
            width: "50%",
            height: 4,
            borderRadius: 10,
            backgroundColor: "#9F9F9F",
          }}
        >
          <TouchableOpacity
            className="min-h-full min-w-full"
            onPress={handleCloseRecipe}
          />
        </View>
        {/* <FlatList
          horizontal
          data={slides}
          renderItem={({ item }) => {
            if (item === "SummarySlide") return <SummarySlide />;
            if (item === "InstructionSlide") return <InstructionSlide />;
            return <></>;
          }}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        /> */}
      </View>
    </ActionSheet>
  );
}
