import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import OptionCard from "../components/OptionCard";
import { Redirect } from "expo-router";

import { UserContext } from "../userContext";
import { useContext } from "react";

import { deleteCurrentLocalUser } from "../api/DatabaseFunctions";

/* testing apis */
import { useQuery } from "@tanstack/react-query";


import { getIngredientProperties } from "../api/IngredientsFunctions";
/* testing apis */

export default function Profile() {
  const { userInfo, setUserInfo, userData, setUserData } =
    useContext(UserContext);
  if (!userData) return <Redirect href={"/"} />;
  const data = userData[0];
  const name = data.name;


  /* test */
  // const { isLoading, error, data, refetch } = useQuery({
  //   queryKey: ["test_query"],
  //   queryFn: async () => ClassifyCategory("cheese"),
  // });
  // console.log(" -- isLoading: ", isLoading);
  // console.log("error: ", error);
  // console.log("data: ", data);
  /* test */

  const handlePreference = async () => {
    const {category, expiration, generic_name} = await getIngredientProperties("dairyqueen oat milk");
    console.log(category);
    console.log(expiration);
    console.log(generic_name);
  };

  function stripHtmlTags(htmlString: any) {
    return htmlString.replace(/<[^>]*>/g, '');
  }

  const handleAppereance =  () => {
    const recipeString =
    'You can never have too many main course recipes, so give Pierogi Casserole a try. This recipe makes 4 servings with <b>846 calories</b>, <b>30g of protein</b>, and <b>32g of fat</b> each. For <b>$1.55 per serving</b>, this recipe <b>covers 28%</b> of your daily requirements of vitamins and minerals. It is a good option if you\'re following a <b>lacto ovo vegetarian</b> diet. This recipe is liked by 1544 foodies and cooks. Plenty of people really liked this Eastern European dish. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. It can be enjoyed any time, but it is especially good for <b>Autumn</b>. This recipe from Pink When requires butter, sharp cheddar cheese, onions, and salt and pepper. Taking all factors into account, this recipe <b>earns a spoonacular score of 90%</b>, which is excellent. Try <a href="https://spoonacular.com/recipes/pierogi-casserole-1249305">Pierogi Casserole</a>, <a href="https://spoonacular.com/recipes/easy-pierogi-casserole-1196331">Easy "Pierogi" Casserole</a>, and <a href="https://spoonacular.com/recipes/easy-pierogi-casserole-276341">Easy "Pierogi" Casserole</a> for similar recipes.';
    console.log(stripHtmlTags(recipeString));
  };
  const handleNotification =  () => {};
  const handleLocation = () => {};
  const handleAboutUs = () => {};

  const handleLogOut = async () => {
    await deleteCurrentLocalUser(setUserInfo, setUserData);
    console.log("Logging out");
  };

  return (
    <View className="bg-white ">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Screen */}
        <View className="min-h-screen items-center mt-20">
          {/* Header */}
          <View className="w-11/12 rounded-2xl bg-green  justify-center shadow-lg">
            <Image
              className="w-[150px] h-[125px] ratio absolute rotate-2 left-[-30px] top-[-41]"
              contentFit="contain"
              source={require("../assets/images/Salady.png")}
            />
            {/* Name */}
            <Text className="font-pps text-xl text-white py-[14] ml-[115]">
              Hi, {name}
            </Text>
          </View>

          {/* Options */}
          <View
            className="w-10/12 items-center justify-center mt-12 flex"
            style={{ gap: 12 }}
          >
            <OptionCard title="Preference" icon="" func={handlePreference} />
            <OptionCard title="Appereance" icon="" func={handleAppereance} />
            <OptionCard
              title="Notification"
              icon=""
              func={handleNotification}
            />
            <OptionCard title="Location" icon="" func={handleLocation} />
            <OptionCard title="About us" icon="" func={handleAboutUs} />
            <OptionCard title="Log out" icon="" func={handleLogOut} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
