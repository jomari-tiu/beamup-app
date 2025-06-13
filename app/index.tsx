import React from "react";
import { Link, Redirect } from "expo-router";
import ThemedText from "../components/ThemedText";
import ThemedView from "../components/ThemedView";
import ThemedLogo from "../components/ThemedLogo";
import { View } from "react-native";
import { useUserContext } from "../context/user-context/context-user";
import ThemedPageLoader from "../components/ThemedPageLoader";
import ThemedButton from "../components/ThemedButton";

export default function Home() {
  const { user, isAuth } = useUserContext();

  if (isAuth && user) {
    return <Redirect href="/book" />;
  }

  if (!isAuth && !user) {
    return <ThemedPageLoader />;
  }

  return (
    <ThemedView safe className=" flex-1 justify-center items-center gap-5">
      <ThemedLogo />
      <ThemedText as="title">Welcome to Shelfie!</ThemedText>
      <ThemedButton>LOGIN</ThemedButton>
      <ThemedButton>REGISTER</ThemedButton>
    </ThemedView>
  );
}
