import { Text } from "react-native";
import React, { useEffect } from "react";
import { useUserContext } from "../../context/user-context/context-user";
import { useRouter } from "expo-router";
import ThemedPageLoader from "../ThemedPageLoader";

export default function GuestOnly({ children }: { children: React.ReactNode }) {
  const { user, isAuth } = useUserContext();

  const router = useRouter();

  useEffect(() => {
    if (isAuth && user !== undefined) {
      router.replace("/book");
    }
  }, [user, isAuth]);

  // while checking for useEffect conditon, this is the render will show
  if (!isAuth && !user) {
    return <ThemedPageLoader />;
  }

  return children;
}
