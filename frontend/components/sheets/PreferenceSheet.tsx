import { useState } from "react";
import ActionSheet, {
  SheetProps,
  SheetManager,
} from "react-native-actions-sheet";

import { View, Text, TouchableOpacity } from "react-native";

import SelectableBox from "../preferences/SelectableBox";

export enum cuisinesEnum {
  African = "African",
  Asian = "Asian",
  American = "American",
  British = "British",
  Cajun = "Cajun",
  Caribbean = "Caribbean",
  Chinese = "Chinese",
  Eastern_European = "Eastern European",
  European = "European",
  French = "French",
  German = "German",
  Greek = "Greek",
  Indian = "Indian",
  Irish = "Irish",
  Italian = "Italian",
  Japanese = "Japanese",
  Jewish = "Jewish",
  Korean = "Korean",
  Latin_American = "Latin American",
  Mediterranean = "Mediterranean",
  Mexican = "Mexican",
  Middle_Eastern = "Middle Eastern",
  Nordic = "Nordic",
  Southern = "Southern",
  Spanish = "Spanish",
  Thai = "Thai",
  Vietnamese = "Vietnamese",
}

const handleClose = () => {
  SheetManager.hide("preference-sheet");
};

const getSelectedLabels = (selectedBoxes: Record<string, boolean>): string => {
  return Object.keys(selectedBoxes)
    .filter((key) => selectedBoxes[key])
    .join(", ");
};

export default function PreferenceSheet(props: SheetProps) {
  const [selectedBoxes, setSelectedBoxes] = useState<Record<string, boolean>>(
    {}
  );

  const toggleSelect = (label: string) => {
    setSelectedBoxes((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  const selectedLabels = getSelectedLabels(selectedBoxes);
  console.log(selectedLabels);

  return (
    <ActionSheet id={props.sheetId}>
      <View className="w-full h-fit min-h-[70%] py-2 items-center rounded-xl">
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
        <View className="bg-grey grid-flow-row-dense w-full">
          {Object.values(cuisinesEnum).map((cuisine) => (
            <SelectableBox
              key={cuisine}
              label={cuisine}
              isSelected={selectedBoxes[cuisine]}
              onToggle={() => toggleSelect(cuisine)}
            />
          ))}
        </View>
      </View>
    </ActionSheet>
  );
}
