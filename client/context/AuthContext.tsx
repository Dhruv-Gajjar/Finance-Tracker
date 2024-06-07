"use client";
import { toast } from "@/components/ui/use-toast";
import { get, post } from "@/utils/axiosService";
import { checkTokenExpiration } from "@/utils/checkTokenExpiration";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface IAuthContext {
  user: IUser | null;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  login: (data: IUser) => Promise<void>;
  signUp: (data: IUser) => Promise<void>;
  logout: () => void;
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
  const [token, setToken] = useState<string>(
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : ""
  );
  const router = useRouter();
  // const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);

  useEffect(() => {
    const tokenExpired = checkTokenExpiration(token);
    if (tokenExpired) {
      refreshToken();
    }
  }, [token]);

  const login = async (data: IUser): Promise<void> => {
    const loginData = await post("/auth/login", data);
    if (loginData?.status !== 200) {
      toast({
        variant: "destructive",
        title: loginData?.response?.data?.message,
      });
    } else {
      const userObj = {
        userId: loginData?.response?.id,
        username: loginData?.response?.username,
        email: loginData?.response?.email,
      };
      setUser(loginData?.response);
      setToken(loginData?.response?.token);
      localStorage.setItem("token", loginData?.response?.token);
      localStorage.setItem("refreshToken", loginData?.response?.refreshToken);
      localStorage.setItem("user", JSON.stringify(userObj));
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

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const getUser = async () => {
    const userString = localStorage.getItem("user");
    let user = null;

    if (userString !== null) {
      user = JSON.parse(userString);
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const userData = await get(`users/${user?.userId}`, config);
    if (userData?.status === 200) {
      setUser(userData?.response);
    } else {
      toast({
        variant: "destructive",
        title: "User not found",
      });
      // router.push("/signup");
    }
  };

  const refreshToken = async () => {
    const tempRefreshToken = localStorage.getItem("refreshToken");
    if (tempRefreshToken) {
      const refreshTokenData = await post("auth/refresh", {
        refresh: tempRefreshToken,
      });
      if (refreshTokenData.status === 200) {
        localStorage.removeItem("token");
        setToken(refreshTokenData?.access_token);
        localStorage.setItem("token", refreshTokenData?.access_token);
        toast({
          title: refreshTokenData?.message,
          className: "bg-green-600",
        });
      } else {
        toast({
          title: "Fail to refresh Token",
          className: "bg-red-600",
        });
      }
    }
  };

  const currentValues = useMemo(
    () => ({
      user,
      token,
      setToken,
      login,
      signUp,
      logout,
    }),
    [user, token, setToken, login, signUp, logout]
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
