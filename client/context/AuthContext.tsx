"use client";
import { toast } from "@/components/ui/use-toast";
import { get, post } from "@/utils/axiosService";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface IAuthContext {
  user: IUser | null;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  login: (data: IUser) => Promise<void>;
  signUp: (data: IUser) => Promise<void>;
}

interface IUser {
  id?: number;
  username: string;
  email: string;
  password?: string;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider = (props: { children: any }) => {
  const { children } = props;
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>("");

  const login = async (data: IUser): Promise<void> => {
    const loginData = await post("/auth/login", data);
    if (loginData?.status !== 200) {
      toast({
        variant: "destructive",
        title: loginData?.response?.data?.message,
      });
    } else {
      setUser(loginData?.response);
      setToken(loginData?.response?.token);
      localStorage.setItem("token", loginData?.response?.token);
    }
  };

  const signUp = async (data: IUser) => {
    const signUpData = await post("auth/register", data);
    if (signUpData?.status !== 200) {
      return toast({
        variant: "destructive",
        title: signUpData?.response?.data?.message,
      });
    } else {
      return signUpData;
    }
  };

  const currentValues = useMemo(
    () => ({
      user,
      token,
      setToken,
      login,
      signUp,
    }),
    [user, token, setToken, login, signUp]
  );

  return (
    <AuthContext.Provider value={currentValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
}
