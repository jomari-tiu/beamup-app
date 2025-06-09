import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";

type ThemedButtonProps = {
  loading?: boolean;
  children: string;
};

type Props = TouchableOpacityProps & ThemedButtonProps;

export default function ThemedButton({ children, loading, ...rest }: Props) {
  return (
    <TouchableOpacity
      {...rest}
      className=" bg-primary px-7 py-2 rounded-lg"
      disabled={loading || rest.disabled}
    >
      <Text className="text-lg text-white font-bold">
        {loading ? <ActivityIndicator color="white" /> : children}
      </Text>
    </TouchableOpacity>
  );
}
