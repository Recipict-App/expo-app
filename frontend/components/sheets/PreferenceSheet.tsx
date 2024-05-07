import { useContext, useEffect, useState } from "react";
import ActionSheet, {
  SheetProps,
  SheetManager,
} from "react-native-actions-sheet";
import { Image } from "expo-image";
import { View, Text, TouchableOpacity } from "react-native";

import { StyleSheet } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";

import { cuisinesEnum, dietsEnum, userDataType } from "../../firebase-type";
import { Redirect } from "expo-router";
import { UserContext } from "../../userContext";

import firestore from "@react-native-firebase/firestore";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeysEnum } from "../../api/_queryKeys";

const cuisines = Object.values(cuisinesEnum).map((cuisine) => ({
  label: cuisine,
  value: cuisine,
}));

const diets = Object.values(dietsEnum).map((diet) => ({
  label: diet,
  value: diet,
}));

const handleClose = () => {
  SheetManager.hide("preference-sheet");
};

export default function PreferenceSheet(props: SheetProps) {
  // get user data from local
  const { userData, setUserData } = useContext(UserContext);
  const queryClient = useQueryClient();
  if (!userData) return <Redirect href="/" />;
  const userCuisines = userData.cuisines;
  const userDiets = userData.diets;

  const [selectedCuisines, setSelectedCuisines] =
    useState<string[]>(userCuisines);
  const [selectedDiets, setSelectedDiets] = useState<string[]>(userDiets);

  const handleSubmit = async () => {
    // update cuisines to firebase
    await firestore()
      .collection("users")
      .doc(userData.uid)
      .update({
        cuisines: selectedCuisines,
      })
      .then(() => {
        console.log("Preference - cuisines updated!");
      });

    // update diets to firebase
    await firestore()
      .collection("users")
      .doc(userData.uid)
      .update({
        diets: selectedDiets,
      })
      .then(() => {
        console.log("Preference - diets updated!");
      });

    // refresh data to get fresh data from firebase to useContext
    const doc = await firestore().collection("users").doc(userData.uid).get();
    if (doc.exists) {
      const data = doc.data() as userDataType;
      setUserData(data);
    }

    // refresh the recipes (no await so the useContext can update first before the query is invalidated)
    queryClient.invalidateQueries({ queryKey: [queryKeysEnum.recipes] });
    queryClient.removeQueries({ queryKey: [queryKeysEnum.recipes] });

    handleClose();
  };

  return (
    <ActionSheet id={props.sheetId}>
      <View className="w-full h-fit min-h-[50%] py-2 items-center rounded-xl">
        {/* top bar */}
        <View
          style={{
            width: "50%",
            height: 4,
            borderRadius: 10,
            backgroundColor: "#9F9F9F",
          }}
        >
          <TouchableOpacity onPress={handleClose} />
        </View>
        <Text className="font-pps text-2xl text-center mt-6">
          Choose your diets
        </Text>
        <View className="w-full px-8 space-y-4">
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={cuisines}
            labelField="label"
            valueField="value"
            placeholder="Select cuisines..."
            searchPlaceholder="Search..."
            value={selectedCuisines}
            onChange={(item) => {
              setSelectedCuisines(item);
            }}
            selectedStyle={styles.selectedStyle}
          />

          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={diets}
            labelField="label"
            valueField="value"
            placeholder="Select diets..."
            searchPlaceholder="Search..."
            value={selectedDiets}
            onChange={(item) => {
              setSelectedDiets(item);
            }}
            selectedStyle={styles.selectedStyle}
          />
        </View>

        {/* Buttons */}
        <View className="flex flex-row w-full justify-center items-end py-4 mt-5">
          <TouchableOpacity onPress={handleSubmit}>
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
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: "#31BD15D",
    borderColor: "#31BD15D",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#31BD15",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#31BD15",
  },
  iconStyle: {
    width: 20,

    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    borderColor: "#31BD15",
    color: "#31BD15",
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    borderColor: "#31BD15",
  },
});
