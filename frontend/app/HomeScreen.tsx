import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { Ingredient } from "../components/Ingredient";
import { Link, Redirect } from "expo-router";

import { ingredientProps, userDataProps } from "../firebase-type";
import { UserContext } from "../userContext";
import { useContext } from "react";
import Explore from "../components/Explore";


export default function Home() {
  const { userData, setUserData } = useContext(UserContext);
  if(!userData)return <Redirect href="/" />;
  const data = userData[0];
  const ingredients = data.ingredients;
  return (
    <SafeAreaView className="bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex w-full items-center p-[20px] py-[40px] overflow-visible min-h-screen" style={{gap: 75}}>
          <View className=" flex w-full items-center justify-center overflow-visible py-[32px]" style={{gap: 20}}>
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
                  <Link href={"/RecipeScreen"}>
                    <Text className=" text-sm font-pps text-[#EC7669]">
                      Show More
                    </Text>
                  </Link>
                </TouchableOpacity>
              </View>
              <View className="overflow-visible">
                <Image
                  className="w-[181px] h-[174px] absolute right-[-30px] top-[-90px]"
                  contentFit="contain"
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
                gap: 12,
              }}
            >
              <Text className=" text-lg font-ppr">Things you bought</Text>
              {ingredients.map((item: ingredientProps, index: number) => {
                return (
                  <Ingredient
                    key={index}
                    name={item.name}
                    quantity={item.quantity}
                    unit={item.unit}
                    dateAdded={item.dateAdded}
                    expiryDate={item.expiryDate}
                    type={item.type}
                  />
                );
              })}
            </View>
          </View>
          <Explore />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
