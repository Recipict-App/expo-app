import { Text, View } from "react-native";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";

export interface IngredientProps {
  name: string;
  quantity: string;
  duration: string;
}

export const Ingredient: React.FC<IngredientProps> = ({
  name,
  quantity,
  duration,
}) => {
  return (
    <TouchableOpacity className="w-full">
      <View className="w-full h-[72px] rounded-3xl bg-[#F8F8F6] flex-row pl-[20px] items-center justify-between">
        <View className="flex flex-row">
          {/* Image placeholder */}
          <View className="bg-[#9B9B9B] rounded-lg h-8 w-8 justify-center flex "></View>

          {/* Text */}
          <View className="ml-4">
            <Text numberOfLines={1} className="text-sm font-pps">
              {name}
            </Text>
            <Text numberOfLines={1} className="text-xs font-ppr text-grey">
              {quantity} - {duration}
            </Text>
          </View>
        </View>

        {/* Arrow */}
        <Image
          className="flex w-[6px] h-[10px] object-contain mr-7"
          source={require("../assets/icons/Arrow.svg")}
        />
      </View>
    </TouchableOpacity>
  );
};
