import React from "react";
import { Link } from "expo-router";
import ThemedText from "../components/ThemedText";
import ThemedView from "../components/ThemedView";
import ThemedLogo from "../components/ThemedLogo";
import { View } from "react-native";

export default function Home() {
  return (
    <ThemedView safe className=" flex-1 justify-center items-center">
      <ThemedLogo />
      <ThemedText as="title">HOME</ThemedText>
      <View className=" gap-2 items-center">
        <Link href="/login" className=" pb-1 border-b border-text">
          <ThemedText>Login</ThemedText>
        </Link>
        <Link href="/register" className=" pb-1 border-b border-text">
          <ThemedText>Register</ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}
