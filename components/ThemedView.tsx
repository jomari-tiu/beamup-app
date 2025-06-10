import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
  safe?: boolean;
};

const ThemedView = ({ children, className, safe = false }: Props) => {
  if (!safe) {
    return (
      <View
        className={twMerge(
          "flex-1 items-center w-full bg-uiBackground",
          className
        )}
      >
        {children}
      </View>
    );
  }
  return (
    <SafeAreaView
      className={twMerge(
        "flex-1 items-center w-full bg-uiBackground",
        className
      )}
    >
      {children}
    </SafeAreaView>
  );
};

export default ThemedView;
