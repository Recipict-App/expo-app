import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native";
import { Image } from "expo-image";
import OptionCard from "../components/OptionCard";
import { Redirect } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

// spoonacular testing ------
import {
  ingredient,
  ingredientTypes,
  preferences,
  userDataProps,
} from "../firebase-type";
const dummyIngredients: ingredient[] = [
  {
    name: "apple",
    quantity: 1,
    unit: "piece",
    expiryDate: new Date(),
    dateAdded: new Date(),
    type: ingredientTypes.Fruits,
  },
  {
    name: "banana",
    quantity: 1,
    unit: "piece",
    expiryDate: new Date(),
    dateAdded: new Date(),
    type: ingredientTypes.Fruits,
  },
  {
    name: "orange",
    quantity: 1,
    unit: "piece",
    expiryDate: new Date(),
    dateAdded: new Date(),
    type: ingredientTypes.Fruits,
  },
  {
    name: "milk",
    quantity: 1,
    unit: "piece",
    expiryDate: new Date(),
    dateAdded: new Date(),
    type: ingredientTypes.Dairy,
  },
  {
    name: "flour",
    quantity: 1,
    unit: "piece",
    expiryDate: new Date(),
    dateAdded: new Date(),
    type: ingredientTypes.Grains,
  },
  {
    name: "chocolate",
    quantity: 1,
    unit: "piece",
    expiryDate: new Date(),
    dateAdded: new Date(),
    type: ingredientTypes.Condiments,
  },
];
const dummyPreferences: preferences = {
  diet: ["Primal,Whole30"],
  cuisine: ["American,Chinese,Meditteranian,Italian,French"],
};
const dummyUserData: userDataProps = {
  name: "alhamdullilah pass phil220",
  email: "aaaaa@aaa.com",
  googleToken: "123",
  ingredients: dummyIngredients,
  preferences: dummyPreferences,
  subscription: "Regular",
};
// spoonacular testing ------

export default function profile() {
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

  // temporary function to test classifier api
  const handlePreference = async () => {
    const name = "apple";
    const CategoryResponse = await fetch(
      `https://us-central1-recipict-gcp.cloudfunctions.net/function-ingredient-classifier-py?name=${name}`,
      {
        method: "GET",
        mode: "cors",
      }
    );

    const data = await CategoryResponse.json();
    console.log(data.category);
  };

  // temporary function to test get recipe api
  const handleAppereance = async () => {
    // extract and append ingredients' name to string
    let ingredientsString = "";
    dummyUserData.ingredients.forEach((ingredient) => {
      ingredientsString += ingredient.name + ",";
    });
    ingredientsString = ingredientsString.slice(0, -1);

    // extract and append cuisines' name to string
    let cuisinesString = "";
    dummyUserData.preferences.cuisine.forEach((eachCuisine) => {
      cuisinesString += eachCuisine + ",";
    });
    cuisinesString = cuisinesString.slice(0, -1);

    // extract and append cuisines' name to string
    let dietsString = "";
    dummyUserData.preferences.diet.forEach((eachDiet) => {
      dietsString += eachDiet + ",";
    });
    dietsString = dietsString.slice(0, -1);

    console.log(ingredientsString);
    console.log(cuisinesString);
    console.log(dietsString);

    const requestBody = {
      ingredients: ingredientsString,
      subscription: dummyUserData.subscription,
      mode: "ready",
      cuisines: cuisinesString,
      diets: dietsString,
    };

    const apiResponse = await fetch(
      `https://us-central1-recipict-gcp.cloudfunctions.net/function-spoonacular-recipe-by-ingredient`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const result = await apiResponse.json();
    console.log(result);
  };

  const handleNotification = () => {};
  const handleLocation = () => {};
  const handleAboutUs = () => {};

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("@user");
    console.log("Logging out");

    setShouldRedirect(true);
  };

  // if (shouldRedirect) {
  //   return <Redirect href="/" />;
  // }

  return (
    <SafeAreaView className="bg-white ">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Screen */}
        <View className="min-h-screen items-center mt-8">
          {/* Header */}
          <View className="w-11/12 rounded-2xl bg-green  justify-center shadow-lg">
            <Image
              className="w-[150px] h-[125px] ratio absolute rotate-2 left-[-30px] top-[-41]"
              contentFit="contain"
              source={require("../assets/images/Salady.png")}
            />
            {/* Name */}
            <Text className="font-pps text-xl text-white py-[14] ml-[115]">
              Hi, Daricky
            </Text>
          </View>

          {/* Options */}
          <View
            className="w-10/12 items-center justify-center mt-12 flex"
            style={{ gap: 12 }}
          >
            <OptionCard title="Preference" icon="" func={handlePreference} />
            <OptionCard title="Appereance" icon="" func={handleAppereance} />
            <OptionCard
              title="Notification"
              icon=""
              func={handleNotification}
            />
            <OptionCard title="Location" icon="" func={handleLocation} />
            <OptionCard title="About us" icon="" func={handleAboutUs} />
            <OptionCard title="Log out" icon="" func={handleLogOut} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
