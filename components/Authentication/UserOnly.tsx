import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useUserContext } from "../../context/user-context/context-user";
import { usePathname, useRouter } from "expo-router";

export default function UserOnly({ children }: { children: React.ReactNode }) {
  const { user, isAuth } = useUserContext();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuth && user === undefined) {
      router.replace("/login");
    }
  }, [user, isAuth, pathname]);

  // while checking for useEffect conditon, this is the render will show
  if (!isAuth || !user) {
    return <Text>Loading</Text>;
  }
  return children;
}
