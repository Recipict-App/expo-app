import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { View, Text, StyleSheet, Button, Modal } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SheetManager } from "react-native-actions-sheet";
import { Redirect } from "expo-router";
import { Image } from "expo-image";

import { useContext } from "react";
import { UserContext } from "../../providers/userContext";

import { useState } from "react";

import { Dropdown } from "react-native-element-dropdown";

import DateTimePicker from "react-native-ui-datepicker";
import { ingredientProps, ingredientsEnum } from "../../types/firebase-type";

import * as Crypto from "expo-crypto";

import { ScannedIngredientsContext } from "../../providers/ScannedItemProvider";

import { getUserDataFromFirebaseAndSetContext } from "../../api/DatabaseFunctions";
import { useEditIngredientToFirebase } from "../../api/mutations";

const type_data = [
  {
    value: ingredientsEnum.Vegetables,
  },
  {
    value: ingredientsEnum.Fruits,
  },
  {
    value: ingredientsEnum.Liquids,
  },
  {
    value: ingredientsEnum.Grains,
  },
  {
    value: ingredientsEnum.Meats,
  },
  {
    value: ingredientsEnum.Dairy,
  },
  {
    value: ingredientsEnum.Seafood,
  },
  {
    value: ingredientsEnum.HerbsAndSpices,
  },
  {
    value: ingredientsEnum.Seeds,
  },
  {
    value: ingredientsEnum.Oils,
  },
  {
    value: ingredientsEnum.Condiments,
  },
  {
    value: ingredientsEnum.NotIngredients,
  },
];

const unit_data = [
  {
    value: "gr",
  },
  {
    value: "ml",
  },
  {
    value: "pc",
  },
];

export default function EditIngredientSheet(
  props: SheetProps<{
    ingredient: {
      name: string;
      quantity: number;
      unit: string;
      expiryDate: Date;
      dateAdded: Date;
      type: ingredientsEnum;
      id: string;
    };
    mode: string;
  }>
) {
  const { scannedIngredients, setScannedIngredients } = useContext(
    ScannedIngredientsContext
  );

  // initiate mutatation
  const editIngredientMutation = useEditIngredientToFirebase();

  // get user data from local
  const { userData, setUserData } = useContext(UserContext);
  if (!userData) return <Redirect href="/" />;
  const data = userData[0];
  const userGoogleToken = data.googleToken;
  const ingredients = data.ingredients;

  //default value for ingredient
  let chosenIngredient = props.payload?.ingredient || {
    name: "something",
    quantity: 1,
    unit: "gr",
    expiryDate: new Date(),
    dateAdded: new Date(),
    type: ingredientsEnum.NotIngredients,
    id: Crypto.randomUUID(),
  };

  // for type dropdown
  const [typeValue, setTypeValue] = useState<ingredientsEnum>(
    chosenIngredient.type
  );

  // for expiry date
  const [dateValue, setDateValue] = useState<Date>(
    new Date(chosenIngredient.expiryDate)
  );
  const [dateModal, setDateModal] = useState<boolean>(false);

  // for quantity and unit
  const [unitValue, setUnitValue] = useState<string>(chosenIngredient.unit);

  // for name
  const [nameValue, setNameValue] = useState<string>(chosenIngredient.name);

  // for quantity
  const [quantityValue, setQuantityValue] = useState<string>(
    chosenIngredient.quantity.toString()
  );

  // handling buttons

  const handleClose = () => {
    SheetManager.hide("edit-ingredients-sheet");
  };

  const handleDelete = async () => {
    const newIngredients = ingredients.filter(
      (eachIngredient) => eachIngredient.id !== chosenIngredient.id
    );

    // push to firebase
    // await editIngredientToFirebase(userGoogleToken, newIngredients);
    await editIngredientMutation.mutateAsync({
      userGoogleToken: userGoogleToken,
      newIngredients: newIngredients,
    });

    // refresh data to get fresh data from firebase
    await getUserDataFromFirebaseAndSetContext(setUserData);
    console.log("new data from firebase is fetched");

    SheetManager.hide("edit-ingredients-sheet");
  };

  const handleEditLocal = async () => {
    console.log("edit local...");
    const newIngredient: ingredientProps = {
      id: chosenIngredient.id,
      name: nameValue,
      quantity: parseInt(quantityValue),
      unit: unitValue,
      expiryDate: dateValue,
      dateAdded: chosenIngredient.dateAdded,
      type: typeValue,
      genericName: nameValue,
    };

    // if there is no ingredient in ingredients, add new ingredient
    const ingredientExists = scannedIngredients.some(
      (ingredient: any) => ingredient.id === chosenIngredient.id
    );
    if (!ingredientExists) {
      scannedIngredients.push(newIngredient);
    }

    const newIngredients = scannedIngredients.map((eachIngredient: any) => {
      if (eachIngredient.id === newIngredient.id) {
        return newIngredient;
      }
      return eachIngredient;
    });
    setScannedIngredients(newIngredients);
    // console.log(newIngredients);
  };

  const handleChange = () => {
    if (props.payload?.mode === "temporary") {
      handleEditLocal();
    } else handleEdit();
    SheetManager.hide("edit-ingredients-sheet");
  };

  const handleEdit = async () => {
    console.log("edit global...");
    const newIngredient: ingredientProps = {
      id: chosenIngredient.id,
      name: nameValue,
      quantity: parseInt(quantityValue),
      unit: unitValue,
      expiryDate: dateValue,
      dateAdded: chosenIngredient.dateAdded,
      type: typeValue,
      genericName: nameValue,
    };

    // if there is no ingredient in ingredients, add new ingredient
    const ingredientExists = ingredients.some(
      (ingredient) => ingredient.id === chosenIngredient.id
    );
    if (!ingredientExists) {
      ingredients.push(newIngredient);
    }

    const newIngredients = ingredients.map((eachIngredient) => {
      if (eachIngredient.id === newIngredient.id) {
        return newIngredient;
      }
      return eachIngredient;
    });

    // push to firebase, and refresh context
    // await editIngredientToFirebase(userGoogleToken, newIngredients);
    await editIngredientMutation.mutateAsync({
      userGoogleToken: userGoogleToken,
      newIngredients: newIngredients,
    });

    // refresh data to get fresh data from firebase
    await getUserDataFromFirebaseAndSetContext(setUserData);
  };

  return (
    <ActionSheet id={props.sheetId}>
      <View
        className="h-fit min-h-[42%] flex items-center px-5 py-2 "
        style={{ gap: 25 }}
      >
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
            onPress={handleClose}
          />
        </View>

        {/* Screen */}
        <View className="flex justify-between flex-row w-full h-fit">
          {/*Left Column*/}
          <View className="flex w-[45%] h-full rounded-2xl" style={{ gap: 10 }}>
            <Text className=" font-pps">Name:</Text>
            <TextInput
              className=" flex justify-center items-center font-ppr text-sm w-full bg-[#F8F8F6] rounded-xl h-[50px] pl-2"
              placeholder="Ingredient Name"
              onChangeText={setNameValue}
              value={nameValue}
            />
            <Text className=" font-pps">Expiry Date:</Text>

            <View className="h-[50px] rounded-xl bg-[#F8F8F6]">
              {/* pop up */}
              <View className="">
                <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={dateModal}
                >
                  {/*All views of Modal*/}
                  <View style={modalStyles.modal}>
                    <DateTimePicker
                      headerContainerStyle={{
                        opacity: 1,
                        backgroundColor: "#F8F8F6",
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                      }}
                      yearContainerStyle={{ backgroundColor: "red" }}
                      value={dateValue}
                      mode={"date"}
                      selectedItemColor="#1BD15D"
                      onValueChange={(date: any) => {
                        setDateValue(date);
                      }}
                    />

                    <TouchableOpacity
                      onPress={() => {
                        setDateModal(!dateModal);
                      }}
                    >
                      <View className="w-[270] h-fit items-center justify-center ">
                        <Image
                          className="flex w-[12px] h-[20px] object-contain rotate-90 "
                          source={require("../../assets/icons/ArrowWhite.svg")}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>

              {/*Button will change state to true and view will re-render*/}
              <TouchableOpacity
                className="h-full w-full"
                onPress={() => {
                  setDateModal(true);
                }}
              >
                <View className=" w-full h-full justify-center items-center">
                  <Text>{dateValue.toString().substring(0, 10)}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/*Right Column*/}
          <View className="flex w-[45%] h-full" style={{ gap: 10 }}>
            <View className="w-full flex-grow" style={{ gap: 10 }}>
              <Text className="font-pps">Quantity:</Text>
              {/* Quantity */}
              <View className="flex flex-row space-x-3">
                <TextInput
                  className="flex  justify-center items-center font-ppr text-sm bg-[#F8F8F6] rounded-xl h-[50px] pl-2 w-[45%] "
                  placeholder="Number"
                  onChangeText={setQuantityValue}
                  value={quantityValue.toString()}
                  keyboardType="numeric"
                />
                <Dropdown
                  style={unitDropdownStyles.dropdown}
                  selectedTextStyle={unitDropdownStyles.selectedTextStyle}
                  placeholderStyle={unitDropdownStyles.placeholderStyle}
                  maxHeight={100}
                  value={unitValue}
                  data={unit_data}
                  valueField="value"
                  labelField="value"
                  placeholder="Unit"
                  searchPlaceholder="Search..."
                  onChange={(e) => {
                    setUnitValue(e.value);
                  }}
                />
              </View>
            </View>
            <View className="w-full" style={{ gap: 10 }}>
              <Text className=" font-pps">Type:</Text>
              <Dropdown
                style={typeDropdownStyles.dropdown}
                selectedTextStyle={typeDropdownStyles.selectedTextStyle}
                placeholderStyle={typeDropdownStyles.placeholderStyle}
                iconStyle={typeDropdownStyles.iconStyle}
                maxHeight={100}
                value={typeValue}
                data={type_data}
                valueField="value"
                labelField="value"
                placeholder="Type"
                searchPlaceholder="Search..."
                onChange={(e) => {
                  setTypeValue(e.value);
                }}
              />
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View
          className="flex flex-row w-full justify-center items-end"
          style={{ gap: 50 }}
        >
          <TouchableOpacity onPress={handleDelete}>
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../../assets/icons/DeleteIngredient.svg")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChange}>
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../../assets/icons/Approve.svg")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
}

const typeDropdownStyles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: "100%",
    backgroundColor: "#F8F8F6",
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

const unitDropdownStyles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: "45%",
    backgroundColor: "#F8F8F6",
    borderRadius: 12,
    paddingHorizontal: 8,
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
});

const modalStyles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F6",
    height: 300,
    width: "80%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderColor: "#fff",
    marginTop: 100,
    marginLeft: 40,
  },
  text: {
    color: "#3f2949",
    fontSize: 12,
    marginTop: 10,
  },
});
