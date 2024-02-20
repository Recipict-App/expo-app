import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import ActionSheet, {
  SheetProps,
  SheetManager,
} from "react-native-actions-sheet";

import { ingredientProps } from "../../firebase-type";
import { Shelf } from "../ingredient components/Shelf";

import { useContext } from "react";
import { UserContext } from "../../userContext";
import { ScannedIngredientsContext } from "../../ScannedItemProvider";

import {
  getUserDataFromFirebaseAndSetContext,
  editIngredientToFirebase,
} from "../../api/DatabaseFunctions";

export default function ScannedItemsSheet(props: SheetProps) {
  const { scannedIngredients, setScannedIngredients } = useContext(
    ScannedIngredientsContext
  );

  console.log("scanned Items: " + scannedIngredients);
  console.log(scannedIngredients);
  
  // get user data from local
  const { userData, setUserData } = useContext(UserContext);
  if (!userData) return null;
  const data = userData[0];
  const userGoogleToken = data.googleToken;
  const ingredients = data.ingredients;

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

    // push to firebase, and refresh context
    await editIngredientToFirebase(userGoogleToken, newIngredients);
    await getUserDataFromFirebaseAndSetContext(setUserData);

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
              {Object.keys(groupedItems).map(function (key) {
                return (
                  <>
                    <Shelf
                      key={key}
                      category={key}
                      ingredients={groupedItems[key]}
                      mode="temporary"
                    />
                  </>
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
