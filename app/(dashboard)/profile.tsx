import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import { useUserContext } from "../../context/userContext/context";
import ThemedButton from "../../components/ThemedButton";

export default function Profile() {
  const { logout } = useUserContext();
  return (
    <ThemedView safe>
      <ThemedText>Profile</ThemedText>
      <ThemedButton onPress={logout}>Logout</ThemedButton>
    </ThemedView>
  );
}
