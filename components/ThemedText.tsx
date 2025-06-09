import { Text } from "react-native";
import React from "react";
import { twMerge } from "tailwind-merge";

const TEXT_AS = {
  title: " text-title text-2xl font-bold",
  ThemedText: "text-text",
} as const;

type Props = {
  children: React.ReactNode;
  as?: keyof typeof TEXT_AS;
  className?: string;
};

const ThemedText = ({ children, className, as = "ThemedText" }: Props) => {
  return <Text className={twMerge(TEXT_AS[as], className)}>{children}</Text>;
};

export default ThemedText;
