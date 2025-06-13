import React, { ComponentProps, useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import { TBooksRes } from "../../../context/book-context/type";
import { useBookContext } from "../../../context/book-context/context-book";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import ThemedPageLoader from "../../../components/ThemedPageLoader";
import ThemedButton from "../../../components/ThemedButton";
import BookForm from "../../../components/Form/CreateBookForm";

export default function BookDetails() {
  const { id } = useLocalSearchParams();
  const [book, setBook] = useState<TBooksRes | null>(null);
  const [isUpdate, setUpdate] = useState(false);
  const { fetchBookId, deleteBook } = useBookContext();

  useEffect(() => {
    setBook(null);
    setUpdate(false);
    const getBook = async () => {
      const response = await fetchBookId(id as string);
      setBook(response);
    };
    getBook();
  }, [id]);

  const onSuccess = (
    values: ComponentProps<typeof BookForm>["defaultValue"]
  ) => {
    setUpdate(false);
    setBook((prev) => {
      if (prev !== null) {
        return {
          ...prev,
          ...values,
        };
      } else return null;
    });
  };

  if (book === null) {
    return <ThemedPageLoader />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView safe className=" justify-center items-center">
        {!isUpdate && (
          <View className=" w-10/12 bg-background p-5 rounded-md border-b-4 border-primary mb-5">
            <ThemedText as="title">{book?.title}</ThemedText>
            <ThemedText className=" mb-5">
              Written by: {book?.author}
            </ThemedText>
            <ThemedText>{book?.description}</ThemedText>
          </View>
        )}
        {isUpdate && (
          <BookForm
            id={id as string}
            defaultValue={{
              author: book.author,
              title: book.title,
              description: book.description,
            }}
            successCallback={onSuccess}
          />
        )}

        <ThemedButton className=" mt-5" onPress={() => setUpdate(!isUpdate)}>
          {isUpdate ? "Cancel" : "Update Book"}
        </ThemedButton>
        <ThemedButton
          className=" bg-warning mt-5"
          onPress={async () => {
            await deleteBook(id as string);
            router.replace("/book");
          }}
        >
          Delete Book
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}
