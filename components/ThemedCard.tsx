import { View, Text } from "react-native";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ThemedCard = ({ children, className }: Props) => {
  return (
    <View className={twMerge("bg-background", className)}>{children}</View>
  );
};

export default ThemedCard;
