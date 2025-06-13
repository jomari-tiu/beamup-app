import { Image, useColorScheme } from "react-native";
import React from "react";
import LightLogo from "../assets/img/logo_light.png";
import DarkLogo from "../assets/img/logo_dark.png";

export default function ThemedLogo() {
  const colorScheme = useColorScheme();
  const logo = colorScheme === "dark" ? DarkLogo : LightLogo;
  return <Image source={logo} />;
}
