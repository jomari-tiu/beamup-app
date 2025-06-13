import { Text } from "react-native";
import React, { useEffect } from "react";
import { useUserContext } from "../../context/user-context/context-user";
import { Redirect, usePathname, useRouter } from "expo-router";
import ThemedPageLoader from "../ThemedPageLoader";

export default function GuestOnly({ children }: { children: React.ReactNode }) {
  const { user, isAuth } = useUserContext();

  if (isAuth && user) {
    return <Redirect href="/book" />;
  }

  if (!isAuth && !user) {
    return <ThemedPageLoader />;
  }

  return children;
}
