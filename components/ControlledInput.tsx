import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import ThemedTextInput from "./ThemedTextInput";
import { Text, View } from "react-native";

type Props<T extends FieldValues> = {
  control: Control<T>;
  error: any;
  name: keyof T;
  textInputProps: React.ComponentProps<typeof ThemedTextInput>;
};
export default function ControlledInput<T extends FieldValues>({
  control,
  error,
  name,
  textInputProps,
}: Props<T>) {
  return (
    <Controller
      name={name as any}
      control={control}
      render={({ field: { onBlur, onChange, value } }) => {
        return (
          <View className=" w-full">
            <ThemedTextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              {...textInputProps}
            />
            {error[name]?.message && (
              <Text className=" text-red-500 text-sm mt-1">
                {error[name]?.message}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
}
