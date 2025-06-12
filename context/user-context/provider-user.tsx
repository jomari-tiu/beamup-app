import { useEffect, useState } from "react";
import { UserContext } from "./context-user";
import { account } from "../../lib/constants/appwrite";
import { ID } from "react-native-appwrite";
import { useRouter } from "expo-router";
import { TUser } from "./type";

type TState = TUser | undefined;

export type TUserContext = {
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
  isAuth: boolean;
  user: TState;
};

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<TState>();
  const [isAuth, setAuth] = useState(false);
  const router = useRouter();

  const login: TUserContext["login"] = async (email, password) => {
    // jomtiu16@gmail.com/Password123@
    try {
      await account.createEmailPasswordSession(email, password);
      const res = await account.get();
      setUser(res as TUser);
      router.push("/profile");
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
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.log(error);
    }
    router.push("/");
    setUser(undefined);
  };

  const getInitialUser = async () => {
    try {
      const res = await account.get();
      setUser(res as TUser);
    } catch (error) {
      setUser(undefined);
    } finally {
      setAuth(true);
    }
  };

  useEffect(() => {
    getInitialUser();
  }, []);

  return (
    <UserContext.Provider value={{ login, register, logout, user, isAuth }}>
      {children}
    </UserContext.Provider>
  );
}
