import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ControlledInput from "../../components/ControlledInput";
import ThemedLogo from "../../components/ThemedLogo";
import ThemedButton from "../../components/ThemedButton";
import ErrorMessage from "../../components/ErrorMessage";
import { useBookContext } from "../../context/book-context/context-book";
import { useRouter } from "expo-router";

const schema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
});

type TForm = z.infer<typeof schema>;

export default function Create() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const { createBook } = useBookContext();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitHandler = async (values: TForm) => {
    setLoading(true);
    setError(null);
    try {
      await createBook(values);
      router.push("/book");
      reset();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView safe className=" justify-center items-center">
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        className=" border border-white"
      >
        <View className=" flex-1 justify-center items-center gap-5 w-10/12">
          <ThemedLogo />
          <ThemedText as="title">Create a Book</ThemedText>

          <ControlledInput
            error={errors}
            control={control}
            name="title"
            textInputProps={{
              placeholder: "Title",
            }}
          />

          <ControlledInput
            error={errors}
            control={control}
            name="description"
            textInputProps={{
              placeholder: "Description",
              multiline: true,
            }}
          />

          <ControlledInput
            error={errors}
            control={control}
            name="author"
            textInputProps={{
              placeholder: "Author Name",
            }}
          />

          <ThemedButton
            onPress={handleSubmit(submitHandler)}
            loading={isLoading}
          >
            Create
          </ThemedButton>
          {error !== null && <ErrorMessage message={error} />}
        </View>
      </TouchableWithoutFeedback>
    </ThemedView>
  );
}
