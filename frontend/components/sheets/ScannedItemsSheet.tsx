import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import ActionSheet, {
  SheetProps,
  SheetManager,
} from "react-native-actions-sheet";

import { ingredientProps, userDataProps } from "../../firebase-type";
import { Shelf } from "../Shelf";

import { useContext, useEffect } from "react";
import { UserContext } from "../../userContext";
import { ScannedIngredientsContext } from "../../ScannedItemProvider";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ScannedItemsSheet(props: SheetProps) {
  const { scannedIngredients, setScannedIngredients } = useContext(ScannedIngredientsContext);

  console.log("scanned Items: " + scannedIngredients);

  // get user from local
  const getLocalUser = async () => {
    const data: any = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  // get user data from local
  const { userData, setUserData } = useContext(UserContext);
  if (!userData) return null;
  const data = userData[0];
  const userGoogleToken = data.googleToken;
  const ingredients = data.ingredients;

  // Button handlers
  const handleDelete = () => {
    SheetManager.hide("scanned-items-sheet");
  };

  const handleAdd = async () => {
    const newIngredients = [...ingredients, scannedIngredients];

    const response = await fetch(
      "https://us-central1-recipict-gcp.cloudfunctions.net/function-edit-ingredients",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: userGoogleToken,
          ingredients: newIngredients,
        }),
      }
    );

    const result = await response.json();

    // console.log(response.status);
    // console.log(result);
    // console.log(result.returnObject);

    // refresh user data
    await getUserData(await getLocalUser());

    SheetManager.hide("scanned-items-sheet");
  };

  // Group items by type for display
  function groupByType(objectArray: Array<ingredientProps>) {
    return objectArray.reduce(function (acc: any, obj: ingredientProps) {
      var key = obj["type"];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }
  const groupedItems = groupByType(scannedIngredients);
  // console.log("🚀 ~ ScannedItemsSheet ~ groupedItems: \n", groupedItems);

  /** Helpers */
  const getUserData = async (user: any) => {
    const checkUserResponse = await fetch(
      "https://us-central1-recipict-gcp.cloudfunctions.net/function-retrieve-user",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: user.id }),
      }
    );

    if (checkUserResponse.status == 404) {
      console.log("User not found in Firebase, creating new user... 🤔");
      const localUserData: userDataProps[] = [
        {
          name: user.name,
          email: user.email,
          googleToken: `${user.id}`,
          ingredients: [],
          preferences: { diet: [], cuisine: [] },
          subscription: "Regular",
        },
      ];

      setUserData(localUserData);

      const createUserResponse = await fetch(
        "https://us-central1-recipict-gcp.cloudfunctions.net/function-create-user",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(localUserData),
        }
      );

      if (createUserResponse.status == 200) {
        console.log("User created in Firebase, retrieving user data... 🥰");
        const user = await createUserResponse.json();
        const userDatabase = user.userData;

        await setUserData(userDatabase);
      } else {
        console.log("Error creating user in Firebase 😡");
      }
    } else {
      console.log("User found in Firebase, retrieving user data... 🤩");

      const user = await checkUserResponse.json();
      const userDatabase = user.userData;

      await setUserData(userDatabase);
    }
  };

  return (
    <ActionSheet id={props.sheetId}>
      <View className="max-h-[92%]">
        {/* Header */}
        <View className="flex items-center gap-2 pt-2 pb-4">
          {/* Blackbar */}
          <View className="w-32 h-1 bg-[#9F9F9F] rounded-xl" />
          {/* Title */}
          <Text className="font-ppr text-xl">Scanned Items</Text>
        </View>

        <ScrollView>
          <View className="flex items-center gap-4 pt-2">
            {/* Scroll */}
            <View
              style={{ gap: 12 }}
              className="justify-center items-center w-10/12 flex"
            >
              {/* Dispay items */}
              {Object.keys(groupedItems).map(function (key) {
                return (
                  <Shelf
                    key={key}
                    category={key}
                    ingredients={groupedItems[key]}
                  />
                );
              })}

              {/* Buttons */}
              <View className=" h-fit flex flex-row space-x-7 pb-1 pt-4 justify-center">
                <TouchableOpacity onPress={handleDelete}>
                  <Image
                    className="w-[56px] h-[56px]"
                    contentFit="contain"
                    source={require("../../assets/icons/DeleteIngredient.svg")}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleAdd}>
                  <Image
                    className="w-[56px] h-[56px]"
                    contentFit="contain"
                    source={require("../../assets/icons/ApproveIngredient.svg")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ActionSheet>
  );
}
