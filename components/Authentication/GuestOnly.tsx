import { Text } from "react-native";
import React, { useEffect } from "react";
import { useUserContext } from "../../context/user-context/context-user";
import { usePathname, useRouter } from "expo-router";
import ThemedPageLoader from "../ThemedPageLoader";

export default function GuestOnly({ children }: { children: React.ReactNode }) {
  const { user, isAuth } = useUserContext();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuth && user) {
      router.replace("/book");
      return;
    }
  }, [user, isAuth, pathname]);

  // while checking for useEffect conditon, this is the render will show
  if (!isAuth && !user) {
    return <ThemedPageLoader />;
  }

  return children;
}
