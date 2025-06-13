import { Keyboard, TouchableWithoutFeedback } from "react-native";
import React from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";

import BookForm from "../../components/Form/CreateBookForm";

export default function Create() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView safe className=" items-center">
        <ThemedText as="title" className=" mb-5">
          Create a Book
        </ThemedText>
        <BookForm />
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}
