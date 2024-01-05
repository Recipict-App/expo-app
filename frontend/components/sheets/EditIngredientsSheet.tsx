import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { View, Text, StyleSheet, Button } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SheetManager } from "react-native-actions-sheet";
import { Image } from "expo-image";

import { useState } from "react";

import { SelectCountry } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";

export enum ingredientTypes {
  Vegetables = "Vegetables",
  Fruits = "Fruits",
  Liquids = "Liquids",
  Grains = "Grains",
  Meats = "Meats",
  Dairy = "Dairy",
  Seafood = "Seafood",
  HerbsAndSpices = "Herbs & spices",
  Seeds = "Seeds",
  Oils = "Oils",
  Condiments = "Condiments",
  NotIngredients = "Not ingredients",
}

const type_data = [
  {
    value: ingredientTypes.Vegetables,
  },
  {
    value: ingredientTypes.Fruits,
  },
  {
    value: ingredientTypes.Liquids,
  },
  {
    value: ingredientTypes.Grains,
  },
  {
    value: ingredientTypes.Meats,
  },
  {
    value: ingredientTypes.Dairy,
  },
  {
    value: ingredientTypes.Seafood,
  },
  {
    value: ingredientTypes.HerbsAndSpices,
  },
  {
    value: ingredientTypes.Seeds,
  },
  {
    value: ingredientTypes.Oils,
  },
  {
    value: ingredientTypes.Condiments,
  },
  {
    value: ingredientTypes.NotIngredients,
  },
];

export default function EditIngredientSheet(
  props: SheetProps<{
    name: string;
    quantity: number;
    unit: string;
    expiryDate: Date;
    dateAdded: Date;
    type: ingredientTypes;
  }>
) {
  const ingredient = props.payload;
  if (!ingredient) return null;

  const [typeValue, setTypeValue] = useState<ingredientTypes>(ingredient.type);

  // const [date, setDate] = useState(new Date());

  // const onChange = (e: any, selectedDate: any) => {
  //   setDate(selectedDate);
  // };

  //--------------------//

  const [nameSheet, setNameSheet] = useState<string>(ingredient.name);
  const [quantitySheet, setQuantitySheet] = useState<string>(
    ingredient.quantity.toString()
  );
  const [expirySheet, setExpirySheet] = useState<string>(
    ingredient.expiryDate.toString()
  );
  const [typeSheet, setTypeSheet] = useState<ingredientTypes>(ingredient.type);

  const handleChangeName = (e: any) => {
    setNameSheet(e);
  };
  const handleChangeQuantity = (e: any) => {
    setQuantitySheet(e);
  };
  const handleChangeExpiry = (e: any) => {
    setExpirySheet(e);
  };
  const handleChangeType = (e: any) => {
    setTypeSheet(e);
  };

  const handleCloseEdit = () => {
    SheetManager.hide("edit-ingredients-sheet");
  };

  const handleEditIngredient = () => {
    const newExpiryDate = new Date(expirySheet);
    if (!newExpiryDate) {
      console.log("date is not valid");
    }
  };

  const handleCheckEnter = (e: any) => {
    console.log(e);
  };

  return (
    <ActionSheet id={props.sheetId}>
      <View
        className=" h-[42%] flex items-center px-5 py-2"
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
            onPress={handleCloseEdit}
          />
        </View>

        {/* Screen */}
        <View className="flex justify-between flex-row w-full h-fit">
          {/*Left Column*/}
          <View className="flex w-[45%] h-full rounded-2xl" style={{ gap: 10 }}>
            <Text className=" font-pps">Name:</Text>
            <TextInput
              className=" flex justify-center items-center font-ppr text-sm w-full bg-[#F8F8F6] rounded-xl h-[60px] pl-2"
              multiline
              placeholder="Ingredient Name"
              onKeyPress={handleCheckEnter}
              onChangeText={handleChangeName}
              value={nameSheet}
            />
            <Text className=" font-pps">Expiry Date:</Text>

            {/* <DateTimePicker
              value={date}
              mode={"date"}
              is24Hour={true}
              onChange={onChange}
            /> */}
          </View>

          {/*Right Column*/}
          <View className="flex w-[45%] h-full" style={{ gap: 10 }}>
            <View className="w-full" style={{ gap: 10 }}>
              <Text className=" font-pps">Quantity:</Text>
              <TextInput
                className=" flex justify-center items-center font-ppr text-sm w-full bg-[#F8F8F6] rounded-xl h-[60px] pl-2"
                multiline
                placeholder="Number"
                onChangeText={handleChangeQuantity}
                value={quantitySheet.toString()}
              />
            </View>
            <View className="w-full" style={{ gap: 10 }}>
              <Text className=" font-pps">Type:</Text>
              <SelectCountry
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                iconStyle={styles.iconStyle}
                maxHeight={100}
                value={typeValue}
                data={type_data}
                valueField="value"
                labelField="value"
                imageField="image"
                placeholder="Select type"
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
          <TouchableOpacity onPress={handleCloseEdit}>
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../../assets/icons/DeleteIngredient.svg")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditIngredient}>
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

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: "100%",
    backgroundColor: "#F8F8F6",
    borderRadius: 10,
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
