import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import ThemedLink from "../../components/ThemedLink";
import ThemedLogo from "../../components/ThemedLogo";

export default function Register() {
  return (
    <ThemedView className=" gap-5">
      <View className=" items-center">
        <ThemedLogo />
        <ThemedText as="title">Register an account.</ThemedText>
      </View>
      <ThemedButton
        onPress={(e) => {
          console.log(e);
        }}
      >
        Register
      </ThemedButton>
      <ThemedLink href="/login">Login instead</ThemedLink>
    </ThemedView>
  );
}
