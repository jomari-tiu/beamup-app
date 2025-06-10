import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "../../constant/colors";
import { Ionicons } from "@expo/vector-icons";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type TabOptionsProps = {
  name: string;
  title: string;
  icon: IoniconName;
  activeIcon: IoniconName;
}[];

const TabsOptions: TabOptionsProps = [
  {
    name: "profile",
    title: "Profile",
    icon: "person",
    activeIcon: "person-outline",
  },
  {
    name: "book",
    title: "Book",
    icon: "book",
    activeIcon: "book-outline",
  },
  {
    name: "create",
    title: "Create",
    icon: "create",
    activeIcon: "create-outline",
  },
];

export default function DashboardLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[(colorScheme as "light" | "dark") ?? "light"];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.navBackground,
          paddingTop: 10,
          height: 90,
        },
        tabBarActiveTintColor: theme.iconColorFocused,
        tabBarInactiveTintColor: theme.iconColor,
      }}
    >
      {TabsOptions.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.title,
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  size={24}
                  color={focused ? theme.iconColorFocused : theme.iconColor}
                  name={focused ? item.icon : item.activeIcon}
                />
              );
            },
          }}
        />
      ))}
    </Tabs>
  );
}
