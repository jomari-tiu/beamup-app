import React from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import { useBookContext } from "../../context/book-context/context-book";

export default function Book() {
  const { books } = useBookContext();

  return (
    <ThemedView safe>
      <ThemedText>Book</ThemedText>
    </ThemedView>
  );
}
