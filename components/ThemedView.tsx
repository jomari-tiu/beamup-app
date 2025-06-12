import { View } from "react-native";
import React from "react";
import { twMerge } from "tailwind-merge";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  className?: string;
  safe?: boolean;
};

const ThemedView = ({ children, className, safe = false }: Props) => {
  const insets = useSafeAreaInsets();
  if (!safe) {
    return (
      <View className={twMerge("bg-uiBackground", className)}>{children}</View>
    );
  }
  return (
    <View
      className={twMerge("bg-uiBackground flex-1", className)}
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {children}
    </View>
  );
};

export default ThemedView;
