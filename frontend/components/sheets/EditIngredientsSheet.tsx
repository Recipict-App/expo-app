import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { View, Text, StyleSheet, Button, Modal } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SheetManager } from "react-native-actions-sheet";
import { Image } from "expo-image";

import { useState } from "react";

import { SelectCountry } from "react-native-element-dropdown";

import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";

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

const unit_data = [
  {
    value: "gr",
  },
  {
    value: "ml",
  },
  {
    value: "ea",
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

  // for type dropdown
  const [typeValue, setTypeValue] = useState<ingredientTypes>(ingredient.type);

  // for expiry date
  const [dateValue, setDateValue] = useState<any>(dayjs());
  const [dateModal, setDateModal] = useState<boolean>(false);

  // for quantity and unit
  const [unitValue, setUnitValue] = useState<string>();

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

  //--------------------//

  const handleCloseEdit = () => {
    SheetManager.hide("edit-ingredients-sheet");
  };

  const handleEditIngredient = () => {
    const newExpiryDate = new Date(expirySheet);
    if (!newExpiryDate) {
      console.log("date is not valid");
    }
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
              className=" flex justify-center items-center font-ppr text-sm w-full bg-[#F8F8F6] rounded-xl h-[50px] pl-2"
              placeholder="Ingredient Name"
              onChangeText={handleChangeName}
              value={nameSheet}
            />
            <Text className=" font-pps">Expiry Date:</Text>

            <View className="h-[50px] rounded-xl bg-[#F8F8F6] px-2">
              <Modal
                animationType={"slide"}
                transparent={true}
                visible={dateModal}
              >
                {/*All views of Modal*/}
                <View style={modalStyles.modal}>
                  <DateTimePicker
                    value={dateValue}
                    mode={"date"}
                    onValueChange={(date) => setDateValue(date)}
                  />
                  <Button
                    title="Done"
                    onPress={() => {
                      setDateModal(!dateModal);
                    }}
                  />
                </View>
              </Modal>

              {/*Button will change state to true and view will re-render*/}
              <Button
                title={dateValue.toString()}
                onPress={() => {
                  setDateModal(true);
                }}
              />
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
                  onChangeText={handleChangeQuantity}
                  value={quantitySheet.toString()}
                />
                <SelectCountry
                  style={unitDropdownStyles.dropdown}
                  selectedTextStyle={unitDropdownStyles.selectedTextStyle}
                  placeholderStyle={unitDropdownStyles.placeholderStyle}
                  maxHeight={100}
                  value={unitValue}
                  data={unit_data}
                  valueField="value"
                  labelField="value"
                  imageField="image"
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
              <SelectCountry
                style={typeDropdownStyles.dropdown}
                selectedTextStyle={typeDropdownStyles.selectedTextStyle}
                placeholderStyle={typeDropdownStyles.placeholderStyle}
                imageStyle={typeDropdownStyles.imageStyle}
                iconStyle={typeDropdownStyles.iconStyle}
                maxHeight={100}
                value={typeValue}
                data={type_data}
                valueField="value"
                labelField="value"
                imageField="image"
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 80,
    marginLeft: 40,
  },
  text: {
    color: "#3f2949",
    fontSize: 12,
    marginTop: 10,
  },
});
