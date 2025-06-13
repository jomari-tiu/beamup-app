import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "expo-router";
import { useBookContext } from "../../context/book-context/context-book";
import ThemedView from "../ThemedView";
import ThemedLogo from "../ThemedLogo";
import ThemedText from "../ThemedText";
import ControlledInput from "../ControlledInput";
import ThemedButton from "../ThemedButton";
import ErrorMessage from "../ErrorMessage";

const schema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
});

type TForm = z.infer<typeof schema>;

type Props = {
  defaultValue?: TForm;
  id?: string;
  successCallback?: (values: TForm) => void;
};

export default function BookForm({ defaultValue, id, successCallback }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const { createBook, updateBook } = useBookContext();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValue,
  });

  const submitHandler = async (values: TForm) => {
    setLoading(true);
    setError(null);
    try {
      if (!id) {
        await createBook(values);
        successCallback?.(values);
        router.push("/book");
      } else {
        await updateBook(id ?? "", values);
        successCallback?.(values);
      }
      reset();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="justify-center items-center gap-5 w-10/12">
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

      <ThemedButton onPress={handleSubmit(submitHandler)} loading={isLoading}>
        {id ? "Update" : "Create"}
      </ThemedButton>
      {error !== null && <ErrorMessage message={error} />}
    </View>
  );
}
