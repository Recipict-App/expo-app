import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { Tabs } from "expo-router/tabs";
import { Image } from "expo-image";

import { SheetProvider } from "react-native-actions-sheet";
import "../sheets.tsx";
import { useEffect, useState } from "react";
import { UserContext } from "../userContext";

import {
  ingredient,
  ingredientTypes,
  preferences,
  userDataProps,
} from "../firebase-type";

// beef shank, onion, garlic, tomato, sugar, cheese, egg
const dummyIngredients: ingredient[] = [
  {
    name: "beef",
    quantity: 1,
    unit: "piece",
    expiryDate: new Date(),
    dateAdded: new Date(),
    type: ingredientTypes.Fruits,
    id: "1",
  },
  {
    name: "onion",
    quantity: 1,
    unit: "piece",
    expiryDate: new Date(),
    dateAdded: new Date(),
    type: ingredientTypes.Fruits,
    id: "2",
  },
  {
    name: "garlic",
    quantity: 1,
    unit: "piece",
    expiryDate: new Date(),
    dateAdded: new Date(),
    type: ingredientTypes.Fruits,
    id: "3",
  },
  {
    name: "tomato",
    quantity: 1,
    unit: "piece",
    expiryDate: new Date(),
    dateAdded: new Date(),
    type: ingredientTypes.Dairy,
    id: "4",
  },
  {
    name: "sugar",
    quantity: 1,
    unit: "piece",
    expiryDate: new Date(),
    dateAdded: new Date(),
    type: ingredientTypes.Grains,
    id: "5",
  },
  {
    name: "egg",
    quantity: 1,
    unit: "piece",
    expiryDate: new Date(),
    dateAdded: new Date(),
    type: ingredientTypes.Condiments,
    id: "6",
  },
  {
    name: "cheese",
    quantity: 1,
    unit: "piece",
    expiryDate: new Date(),
    dateAdded: new Date(),
    type: ingredientTypes.Condiments,
    id: "7",
  },
  {
    name: "milk",
    quantity: 1,
    unit: "piece",
    expiryDate: new Date(),
    dateAdded: new Date(),
    type: ingredientTypes.Condiments,
    id: "8",
  },
];

const dummyPreferences: preferences = {
  diet: [],
  cuisine: [],
};
const dummyUserData: userDataProps = {
  name: "alhamdullilah pass phil220",
  email: "aaaaa@aaa.com",
  googleToken: "123",
  ingredients: dummyIngredients,
  preferences: dummyPreferences,
  subscription: "Regular",
};

// haven't been used
interface recipeInfo {
  title: String;
  summary: String;
  instructions: any[];
  missedIngredientCount: number;
  id: String;
  readyInMinutes: number;
  totalIngredients: {
    name: String;
    quantity: String;
  };
}
export default function HomeLayout() {
  const [userData, setUserData] = useState<userDataProps[]>();
  const [recipes, setRecipes] = useState<any>([]);
  const handleGetIngredient = async () => {
    // extract and append ingredients' name to string
    let ingredientsString = "";
    dummyUserData.ingredients.forEach((ingredient) => {
      ingredientsString += ingredient.name + ",";
    });
    ingredientsString = ingredientsString.slice(0, -1);

    // extract and append cuisines' name to string
    let cuisinesString = "";
    dummyUserData.preferences.cuisine.forEach((eachCuisine) => {
      cuisinesString += eachCuisine + ",";
    });
    cuisinesString = cuisinesString.slice(0, -1);

    // extract and append cuisines' name to string
    let dietsString = "";
    dummyUserData.preferences.diet.forEach((eachDiet) => {
      dietsString += eachDiet + ",";
    });
    dietsString = dietsString.slice(0, -1);

    const requestBody = {
      ingredients: ingredientsString,
      subscription: dummyUserData.subscription,
      mode: "min-missing-ingredient",
      cuisines: cuisinesString,
      diets: dietsString,
    };

    const apiResponse = await fetch(
      `https://us-central1-recipict-gcp.cloudfunctions.net/function-spoonacular-recipe-by-ingredient`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
    let newRecipes: any[] = [];
    const result = await apiResponse.json();
    result.results.map((recipeInfo: any) => {
      const {
        title,
        summary,
        analyzedInstructions,
        missedIngredientCount,
        id,
        readyInMinutes,
        extendedIngredients,
        image,
      } = recipeInfo;
      const instructions = analyzedInstructions[0].steps.map(
        (stepInfo: any) => {
          // console.log(stepInfo);
          return {
            equipment: stepInfo.equipment,
            ingredients: stepInfo.ingredients,
            step: stepInfo.step,
          };
        }
      );
      const totalIngredients = extendedIngredients.map((ingredient: any) => {
        return {
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit == "" ? "ea" : ingredient.unit,
        };
      });
      newRecipes = [
        ...newRecipes,
        {
          title,
          summary,
          instructions,
          missedIngredientCount,
          id,
          readyInMinutes,
          totalIngredients,
          image,
        },
      ];

      // console.log("instructions: ", instructions);
      // console.log("title: " + title);
      // console.log("summary: " + summary);
    });
    setRecipes(newRecipes);
    console.log("Recipes Loaded 🥰");
  };

  useEffect(() => {
    handleGetIngredient();
  }, []);

  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <UserContext.Provider value={{ userData, setUserData, recipes }}>
      <SheetProvider>
        <Tabs
          initialRouteName="HomeScreen"
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#1BD15D",
            tabBarActiveBackgroundColor: "#E8FBED",
            tabBarInactiveTintColor: "#C4C4C4",
            // tabBarStyle: { borderTopWidth: 0},
          }}
        >
          <Tabs.Screen
            name="HomeScreen"
            options={{
              tabBarIcon: () => (
                <Image
                  className="w-[20px] h-[20px]"
                  source={require("../assets/icons/Home.svg")}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="PantryScreen"
            options={{
              tabBarIcon: () => (
                <Image
                  className="w-[20px] h-[20px]"
                  source={require("../assets/icons/Pantry.svg")}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="ScanScreen"
            options={{
              tabBarIcon: () => (
                <Image
                  className="w-[100px] h-[100px]"
                  source={require("../assets/icons/Add.svg")}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="RecipeScreen"
            options={{
              tabBarIcon: () => (
                <Image
                  className="w-[20px] h-[20px]"
                  source={require("../assets/icons/Recipe.svg")}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="ProfileScreen"
            options={{
              tabBarIcon: () => (
                <Image
                  className="w-[20px] h-[20px]"
                  contentFit="contain"
                  source={require("../assets/icons/Profile.svg")}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="index"
            options={{
              href: null,
              // tabBarStyle: { display: "none" }, // comment for development
            }}
          />

          <Tabs.Screen
            name="oauthredirect"
            options={{
              href: null,
            }}
          />
        </Tabs>
      </SheetProvider>
    </UserContext.Provider>
  );
}
