import { ActivityIndicator } from "react-native";
import React from "react";
import { themedColor } from "../helper/themedColor";

export default function ThemedLoader() {
  const theme = themedColor();
  return <ActivityIndicator color={theme.text} size="large" />;
}
