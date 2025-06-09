import { View, Text } from "react-native";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ThemedView = ({ children, className }: Props) => {
  return (
    <View
      className={twMerge(
        "flex-1 justify-center items-center w-full bg-uiBackground",
        className
      )}
    >
      {children}
    </View>
  );
};

export default ThemedView;
