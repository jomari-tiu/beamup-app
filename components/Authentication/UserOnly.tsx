import { Text } from "react-native";
import React from "react";
import { useUserContext } from "../../context/user-context/context-user";
import { Redirect } from "expo-router";
import ThemedPageLoader from "../ThemedPageLoader";

export default function UserOnly({ children }: { children: React.ReactNode }) {
  const { user, isAuth } = useUserContext();

  if (isAuth && user === undefined) {
    return <Redirect href="/book" />;
  }

  if (!isAuth || !user) {
    return <ThemedPageLoader />;
  }
  return children;
}
