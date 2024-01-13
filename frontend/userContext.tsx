import { createContext, Dispatch } from "react";
import { userInfoType, userDataProps } from "./firebase-type";

interface UserContextType {
  userInfo: userInfoType | undefined;
  setUserInfo: Dispatch<React.SetStateAction<userInfoType | undefined>>;
  userData: userDataProps[] | undefined;
  setUserData: Dispatch<React.SetStateAction<userDataProps[] | undefined>>;
  recipes: any; // remove later, recipes already has been split into readyRecipes and missingRecipes
  readyRecipes: any;
  missingRecipes: any;
  randomRecipes: any;
}

export const UserContext = createContext<UserContextType>({
  userInfo: {
    email: "",
    family_name: "",
    given_name: "",
    id: "",
    locale: "",
    name: "",
    picture: "",
    verified_email: false,
  },
  setUserInfo: () => {},

  userData: [
    {
      name: "",
      email: "",
      googleToken: "",
      ingredients: [],
      preferences: {
        diet: [],
        cuisine: [],
      },
      subscription: "",
    },
  ],
  setUserData: () => {},

  recipes: [],
  readyRecipes: [],
  missingRecipes: [],
  randomRecipes: [],
});
