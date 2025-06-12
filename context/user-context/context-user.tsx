import { createContext, useContext } from "react";
import { TUserContext } from "./provider-user";

export const UserContext = createContext<TUserContext | undefined>(undefined);

export const useUserContext = () => {
  const user = useContext(UserContext);
  if (user === undefined) {
    throw new Error("Error with User Context");
  }
  return user;
};
