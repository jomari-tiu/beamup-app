import React, { useState } from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import { useBookContext } from "../../context/book-context/context-book";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Link, useRouter } from "expo-router";
import ThemedLoader from "../../components/ThemedLoader";

export default function Book() {
  const { books, fetchBooks } = useBookContext();
  const router = useRouter();
  const [isRefresh, setRefresh] = useState(false);
  const onRefresh = async () => {
    setRefresh(true);
    await fetchBooks();
    setRefresh(false);
  };

  return (
    <ThemedView className=" flex-1 justify-center items-center gap-5">
      <ThemedText as="title">Your reading list</ThemedText>
      <FlatList
        refreshing={isRefresh}
        onRefresh={onRefresh}
        className=" w-11/12"
        data={books}
        ListEmptyComponent={() => (
          <View className=" flex-1 justify-center items-center">
            <ThemedLoader />
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/books/${item.$id}`)}>
            <View className=" bg-background w-full p-5 rounded-md border-l-4 border-primary my-2">
              <ThemedText as="title">{item.title}</ThemedText>
              <ThemedText>Writter by: {item.author}</ThemedText>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.$id}
      />
    </ThemedView>
  );
}
