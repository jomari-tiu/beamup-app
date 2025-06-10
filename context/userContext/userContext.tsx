import { createContext, useState } from "react";
import { UserContext } from "./context";
import { account } from "../../lib/constants/appwrite";
import { ID } from "react-native-appwrite";
import { useRouter } from "expo-router";

type TState =
  | {
      name: string;
    }
  | undefined;

export type TUserContext = {
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
  user: TState;
};

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<TState>();
  const router = useRouter();

  const login: TUserContext["login"] = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const res = await account.get();
      setUser(res);
    } catch (error: any) {
      throw Error(error.message);
    }
  };

  const register: TUserContext["register"] = async (email, password) => {
    try {
      await account.create(ID.unique(), email, password);
      router.push("/login");
    } catch (error: any) {
      throw Error(error.message);
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ login, register, logout, user }}>
      {children}
    </UserContext.Provider>
  );
}
