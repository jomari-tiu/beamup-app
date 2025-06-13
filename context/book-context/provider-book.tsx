import { useEffect, useState } from "react";
import { BookContext } from "./context-book";
import { databases, client } from "../../lib/constants/appwrite";
import { ID, Models, Permission, Query, Role } from "react-native-appwrite";
import { useUserContext } from "../user-context/context-user";
import { TBooksRes } from "./type";

export type TBooks = Pick<TBooksRes, "title" | "description" | "author">;

export type TBooksContext = {
  books: TBooksRes[];
  fetchBooks: () => void;
  fetchBookId: (id: string) => any;
  createBook: (payload: TBooks) => void;
  updateBook: (id: string, payload: TBooks) => void;
  deleteBook: (id: string) => void;
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
      setBooks((books?.documents as TBooksRes[]) ?? []);
    } catch (error: any) {
      throw Error(error.message);
    }
  };

  const fetchBookId = async (id: string) => {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id
      );
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  };

  const createBook = async (payload: Omit<TBooks, "userId">) => {
    try {
      await databases.createDocument(
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

  const updateBook = async (id: string, payload: TBooks) => {
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, payload);
    } catch (error: any) {
      throw Error(error.message);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    } catch (error: any) {
      throw Error(error.message);
    }
  };

  useEffect(() => {
    let unsubscribe: any;
    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;
    if (user) {
      fetchBooks();
      unsubscribe = client.subscribe(channel, ({ payload, events }: any) => {
        if (events[0].includes("create")) {
          setBooks((prev) => [...prev, payload as TBooksRes]);
        }
        if (events[0].includes("delete")) {
          setBooks((prevBook) =>
            prevBook.filter((fil) => fil.$id !== payload.$id)
          );
        }
        if (events[0].includes("update")) {
          setBooks((prevBook) =>
            prevBook.map((iMap) => {
              if (iMap.$id === payload.$id) {
                return {
                  ...iMap,
                  ...payload,
                };
              }
              return iMap;
            })
          );
        }
      });
    }
    if (!user) setBooks([]);

    return () => {
      if (unsubscribe) unsubscribe();
    };
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
