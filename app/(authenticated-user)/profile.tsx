import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import { useUserContext } from "../../context/user-context/context-user";
import ThemedButton from "../../components/ThemedButton";

export default function Profile() {
  const { logout, user } = useUserContext();

  return (
    <ThemedView safe>
      <ThemedText>Profile</ThemedText>
      <ThemedText>{user?.email}</ThemedText>
      <ThemedButton onPress={async () => await logout()}>Logout</ThemedButton>
    </ThemedView>
  );
}
