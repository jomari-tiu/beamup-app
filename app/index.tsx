import React from "react";
import { Link } from "expo-router";
import ThemedText from "../components/ThemedText";
import ThemedView from "../components/ThemedView";
import ThemedLogo from "../components/ThemedLogo";

export default function Home() {
  return (
    <ThemedView>
      <ThemedLogo />
      <ThemedText as="title">HOME</ThemedText>
      <Link href="/login" className=" pb-1 border-b border-text">
        <ThemedText>Login</ThemedText>
      </Link>
      <Link href="/register" className=" pb-1 border-b border-text">
        <ThemedText>Register</ThemedText>
      </Link>
    </ThemedView>
  );
}
