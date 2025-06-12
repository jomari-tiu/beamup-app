import React from "react";
import ThemedLoader from "./ThemedLoader";
import ThemedView from "./ThemedView";
import ThemedLogo from "./ThemedLogo";

export default function ThemedPageLoader() {
  return (
    <ThemedView className=" flex-1 justify-center items-center gap-2">
      <ThemedLogo />
      <ThemedLoader />
    </ThemedView>
  );
}
