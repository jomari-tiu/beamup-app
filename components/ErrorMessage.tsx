import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <View className=" w-full p-5 justify-center items-center bg-red-200 rounded-lg">
      <Text className=" text-warning">{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
