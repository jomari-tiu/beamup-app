import React from "react";
import { Tabs } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import UserOnly from "../../components/Authentication/UserOnly";
import { themedColor } from "../../helper/themedColor";
import { useUserContext } from "../../context/user-context/context-user";
import { View } from "react-native";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import ThemedLogo from "../../components/ThemedLogo";
import ThemedButton from "../../components/ThemedButton";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type TabOptionsProps = {
  name: string;
  title: string;
  icon?: IoniconName;
  activeIcon?: IoniconName;
}[];

const TabsOptions: TabOptionsProps = [
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
  const theme = themedColor();

  const { user, logout } = useUserContext();
  return (
    <UserOnly>
      <ThemedView safe className=" flex-1">
        <View className=" items-center mb-10">
          <View className=" w-11/12 justify-between flex-row items-center">
            <View>
              <ThemedLogo />
              <ThemedText className="text-center">{user?.email}</ThemedText>
            </View>
            <ThemedButton onPress={logout}>Logout</ThemedButton>
          </View>
        </View>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.navBackground,
              paddingTop: 10,
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
          <Tabs.Screen
            name="books/[id]"
            options={{
              href: null,
            }}
          />
        </Tabs>
      </ThemedView>
    </UserOnly>
  );
}
