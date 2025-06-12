import { useColorScheme } from "react-native";
import { Colors } from "../constant/colors";

export const themedColor = () => {
  const colorScheme = useColorScheme();
  return Colors[(colorScheme as "light" | "dark") ?? "light"];
};
