import { createContext, Dispatch } from "react";
import { userDataProps } from "./firebase-type";

interface UserContextType {
  userData: userDataProps[] | undefined;
  setUserData: Dispatch<React.SetStateAction<userDataProps[] | undefined>>;
  recipes: any;
}

export const UserContext = createContext<UserContextType>({
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
});
