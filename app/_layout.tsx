import { useColorScheme, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import UserProvider from "../context/user-context/provider-user";
import { themedColor } from "../helper/themedColor";
import BookProvider from "../context/book-context/provider-book";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 400,
  fade: true,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = themedColor();

  return (
    <View className={` flex-1 ${colorScheme}`}>
      <UserProvider>
        <BookProvider>
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
            <Stack.Screen name="(authenticated-user)" />
          </Stack>
        </BookProvider>
      </UserProvider>
    </View>
  );
}
