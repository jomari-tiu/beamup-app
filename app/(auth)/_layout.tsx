import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import GuestOnly from "../../components/Authentication/GuestOnly";

export default function AuthLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <GuestOnly>
        <Stack screenOptions={{ headerShown: false }} />
      </GuestOnly>
    </>
  );
}

const styles = StyleSheet.create({});
