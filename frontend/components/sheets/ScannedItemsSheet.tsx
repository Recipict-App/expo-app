import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import ActionSheet, {
  SheetProps,
  SheetManager,
} from "react-native-actions-sheet";

import { ingredientProps, userDataType } from "../../types/firebase-type";
import { Shelf } from "../ingredients/Shelf";

import { useContext } from "react";
import { UserContext } from "../../providers/userContext";
import { ScannedIngredientsContext } from "../../providers/ScannedItemProvider";

import firestore from "@react-native-firebase/firestore";
import { useQueryClient } from "@tanstack/react-query";

import { queryKeysEnum } from "../../api/_queryKeys";

export default function ScannedItemsSheet(props: SheetProps) {
  const { scannedIngredients, setScannedIngredients } = useContext(
    ScannedIngredientsContext
  );
  const queryClient = useQueryClient();

  // console.log(scannedIngredients);

  // get user data from local
  const { userData, setUserData } = useContext(UserContext);
  if (!userData) return null;
  const ingredients = userData.ingredients;

  // Button handlers
  const handleDelete = () => {
    SheetManager.hide("scanned-items-sheet");
    setScannedIngredients([]);
  };

  const handleAdd = async () => {
    const newIngredients: ingredientProps[] = [
      ...ingredients,
      ...scannedIngredients,
    ];


    // update diets to firebase
    await firestore()
      .collection("users")
      .doc(userData.uid)
      .update({
        ingredients: newIngredients,
      })
      .then(() => {
        console.log("Preference - ingredients updated! (added)");
      });

    // refresh data to get fresh data from firebase to useContext
    const doc = await firestore().collection("users").doc(userData.uid).get();
    if (doc.exists) {
      const data = doc.data() as userDataType;
      setUserData(data);
    }

    // refresh the recipes
    await queryClient.invalidateQueries({ queryKey: [queryKeysEnum.recipes] });
    await queryClient.removeQueries({ queryKey: [queryKeysEnum.recipes] });

    SheetManager.hide("scanned-items-sheet");
  };

  // Group items by type for display
  function groupByType(objectArray: Array<ingredientProps>) {
    if (!objectArray) return;
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

  return (
    <ActionSheet id={props.sheetId} closeOnTouchBackdrop={false}>
      <View className="min-h-[50%] max-h-[92%] p-[2]">
        {/* Header */}
        <View className="flex items-center gap-2 pt-2 pb-4">
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
              {Object.keys(groupedItems).map(function (key, index) {
                return (
                  <Shelf
                    key={index}
                    category={key}
                    ingredients={groupedItems[key]}
                    mode="temporary"
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