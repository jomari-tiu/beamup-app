import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { twMerge } from "tailwind-merge";

type ThemedButtonProps = {
  loading?: boolean;
  children: string;
};

type Props = TouchableOpacityProps & ThemedButtonProps;

export default function ThemedButton({ children, loading, ...rest }: Props) {
  return (
    <TouchableOpacity
      {...rest}
      className={twMerge(" bg-primary px-7 py-2 rounded-lg", rest.className)}
      disabled={loading || rest.disabled}
    >
      <Text className="text-lg text-white font-bold">
        {loading ? <ActivityIndicator color="white" /> : children}
      </Text>
    </TouchableOpacity>
  );
}
