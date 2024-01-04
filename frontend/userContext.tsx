import { createContext, Dispatch } from "react";
import { userDataProps } from "./app/index";


interface UserContextType {
    userData: userDataProps[];
    setUserData: Dispatch<React.SetStateAction<userDataProps>>;
  }
  
  export const UserContext = createContext<UserContextType>({
    userData: [{
      name: '',
      email: '',
      googleToken: '',
      ingredients: [],
      preferences: {
        diet: [],
        cuisine: [],
      },
      subscription: '',
    }],
    setUserData: () => {},
  });