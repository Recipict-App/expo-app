import { Text, View, SafeAreaView, ScrollView, Image } from "react-native";
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
        <View className="w-full h-[72px] rounded-3xl bg-[#F8F8F6] flex justify-center p-[20px] pl-[30px]">
          <Text className=" text-base font-pps">{name}</Text>
          <Text className=" text-base font-ppr opacity-50">
            {quantity} - {duration}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };