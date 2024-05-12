import { createContext, Dispatch } from "react";
import { userDataType } from "./firebase-type";

interface UserContextType {
  userData: userDataType | undefined;
  setUserData: Dispatch<React.SetStateAction<userDataType | undefined>>;
}

export const UserContext = createContext<UserContextType>({
  userData: {
    name: "",
    email: "",
    uid: "",
    photoURL: "",
    metadata: {
      creationTime: "",
      lastSignInTime: "",
      lastRefreshTime: "",
      toJSON: () => ({}),
    },
    ingredients: [],
    diets: [],
    cuisines: [],
    subscription: false,
  },

  setUserData: () => {},
});
