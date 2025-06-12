import { createContext, useContext } from "react";
import { TBooksContext } from "./provider-book";

export const BookContext = createContext<TBooksContext | undefined>(undefined);

export const useBookContext = () => {
  const books = useContext(BookContext);
  if (books === undefined) {
    throw new Error("Error with Book Context");
  }
  return books;
};
