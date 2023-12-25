import { Text, View, SafeAreaView, ScrollView, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { IngredientProps, Ingredient } from "../components/Ingredient";

const dummyIngredients: IngredientProps[] = [
  { name: "Sweet Soy Sauce", quantity: "500ml", duration: "3 months ago" },
  { name: "Dany Raihan", quantity: "500kg", duration: "19 years ago" },
  { name: "Erick Jovan", quantity: "56kg", duration: "19 years ago" },
  { name: "Dany Raihan", quantity: "500kg", duration: "19 years ago" },
  { name: "Dany Raihan", quantity: "500kg", duration: "19 years ago" },
];

export default function Home() {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex w-full items-center justify-center p-[20px] pt-[40px] overflow-visible">
          <View className=" flex w-full gap-[20px] items-center justify-center overflow-visible">
            <View className="w-full">
              <Text className="font-ppr text-3xl">
                What's
                <Text className="font-ppb text-green"> Cooking?</Text>
              </Text>
            </View>
            <View className="flex justify-center w-full h-[190px] bg-[#F3F6C8] p-[24px] gap-[2px] overflow-visible rounded-3xl">
              <View className="flex gap-[7px]">
                <Text className=" font-pps text-xl w-[250px]">
                  Get that wok moving with these recipes
                </Text>
                <Text className="text-xs font-ppr opacity-40 w-[183px]">
                  Found 3 dishes ready to be made
                </Text>
                <TouchableOpacity>
                  <Text className=" text-sm font-pps text-[#EC7669]">
                    Show More
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="overflow-visible">
                <Image
                  className="w-[181px] h-[174px] absolute right-[-30px] top-[-90px]"
                  style={{ resizeMode: "contain" }}
                  source={require("../assets/images/Bowl.png")}
                />
              </View>
            </View>
            <View
              style={{
                width: 320,
                paddingTop: 60,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
              }}
            >
              <Text className=" text-lg font-ppr">Things you bought</Text>
              {dummyIngredients.map((item, index) => {
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
