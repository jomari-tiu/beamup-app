import { TextInput, View } from "react-native";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constant/colors";
import { themedColor } from "../helper/themedColor";

type Props = React.ComponentProps<typeof TextInput>;

export default function ThemedTextInput({ ...rest }: Props) {
  const theme = themedColor();

  const [show, setShow] = useState(true);
  return (
    <View className=" w-full flex-row items-center bg-background">
      <TextInput
        {...rest}
        className={twMerge(" flex-1 text-text p-5", rest.className)}
        secureTextEntry={rest.secureTextEntry && show}
      />
      {rest?.secureTextEntry && (
        <Ionicons
          name={!show ? "eye" : "eye-off"}
          size={20}
          color={theme.iconColor}
          className=" mr-3"
          onPress={() => setShow(!show)}
        />
      )}
    </View>
  );
}
