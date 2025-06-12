import { useEffect, useState } from "react";
import { BookContext } from "./context-book";
import { databases } from "../../lib/constants/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUserContext } from "../user-context/context-user";
import { TBooksRes } from "./type";

export type TBooks = Pick<TBooksRes, "title" | "description" | "author">;

export type TBooksContext = {
  books: TBooks[];
  fetchBooks: () => void;
  fetchBookId: () => void;
  createBook: (payload: TBooks) => void;
  updateBook: () => void;
  deleteBook: () => void;
};

const DATABASE_ID = "6847ee3b003221f5ac6a";
const COLLECTION_ID = "6847ee740036361d6fff";

export default function BookProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [books, setBooks] = useState<TBooksRes[]>([]);
  const { user } = useUserContext();

  const fetchBooks = async () => {
    try {
      const books = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal("userId", user?.$id ?? ""),
      ]);
      setBooks(books as unknown as TBooksRes[]);
    } catch (error: any) {
      throw Error(error.message);
    }
  };

  const fetchBookId = async () => {
    try {
    } catch (error: any) {
      throw Error(error.message);
    }
  };

  const createBook = async (payload: Omit<TBooks, "userId">) => {
    try {
      const newBook = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        { ...payload, userId: user?.$id },
        [
          Permission.read(Role.user(user?.$id ?? "")),
          Permission.update(Role.user(user?.$id ?? "")),
          Permission.delete(Role.user(user?.$id ?? "")),
        ]
      );
    } catch (error: any) {
      throw Error(error.message);
    }
  };

  const updateBook = async () => {
    try {
    } catch (error: any) {
      throw Error(error.message);
    }
  };

  const deleteBook = async () => {
    try {
    } catch (error: any) {
      throw Error(error.message);
    }
  };

  useEffect(() => {
    if (user) fetchBooks();
    if (!user) setBooks([]);
  }, [user]);

  return (
    <BookContext.Provider
      value={{
        books,
        fetchBooks,
        fetchBookId,
        createBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
