import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import ThemedLink from "../../components/ThemedLink";
import ThemedLogo from "../../components/ThemedLogo";

export default function Login() {
  return (
    <ThemedView className=" gap-5">
      <View className=" items-center">
        <ThemedLogo />
        <ThemedText as="title">Login your account.</ThemedText>
      </View>
      <ThemedButton
        onPress={(e) => {
          console.log(e);
        }}
      >
        Login
      </ThemedButton>
      <ThemedLink href="/register">Register instead</ThemedLink>
    </ThemedView>
  );
}
