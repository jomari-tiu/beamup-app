import { useColorScheme, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import "../global.css";
import { Colors } from "../constant/colors";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[(colorScheme as "light" | "dark") ?? "light"];
  return (
    <View className={` flex-1 ${colorScheme}`}>
      <StatusBar backgroundColor="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.navBackground,
          },
          headerTintColor: theme.title,
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "HOME",
          }}
        />
        <Stack.Screen name="(auth)" />
      </Stack>
    </View>
  );
}
