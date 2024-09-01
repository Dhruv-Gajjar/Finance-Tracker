"use client";
import { toast } from "@/components/ui/use-toast";
// import { login } from "@/services/auth.service";
import { getUserById } from "@/services/userService.service";
import { get, post } from "@/utils/axiosService";
import { checkTokenExpiration } from "@/utils/checkTokenExpiration";
import { IUser } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
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

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const queryClient = useQueryClient();

  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>(
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : ""
  );
  const router = useRouter();

  const { data: userData } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      await getUserById(user?.userId!, token);
      // setUser(userData);
      console.log("User", user);
    },
  });

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

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let user = localStorage.getItem("user");

      console.log("LS_USER: ", user);
    }
  }, []);

  const login = useCallback(async (data: IUser): Promise<void> => {
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
  }, []);

  // const { status, error, mutate } = useMutation({
  //   mutationFn: login,
  //   onSuccess: (loginData) => {
  //     queryClient.setQueryData(["login"], loginData);
  //     console.log("LOGIIN: ", loginData);
  //     toast({
  //       value: "default",
  //       title: "User Logged in!",
  //       className: "bg-green-600",
  //     });
  //   },
  //   onError: (error) => {
  //     toast({
  //       value: "warning",
  //       title: "Login Failed Try Again!",
  //       className: "bg-red-600",
  //     });
  //   },
  // });

  // const login = async (data: IUser): Promise<void> => {
  //   const loginData = await post("/auth/login", data);
  //   if (loginData?.status !== 200) {
  //     toast({
  //       variant: "destructive",
  //       title: loginData?.response?.data?.message,
  //     });
  //   } else {
  //     const userObj = {
  //       userId: loginData?.response?.id,
  //       username: loginData?.response?.username,
  //       email: loginData?.response?.email,
  //     };
  //     setUser(loginData?.response);
  //     setToken(loginData?.response?.token);
  //     localStorage.setItem("token", loginData?.response?.token);
  //     localStorage.setItem("refreshToken", loginData?.response?.refreshToken);
  //     localStorage.setItem("user", JSON.stringify(userObj));
  //   }
  // };

  const signUp = useCallback(async (data: IUser) => {
    const signUpData = await post("auth/register", data);
    if (signUpData?.status !== 200) {
      return toast({
        variant: "destructive",
        title: signUpData?.response?.data?.message,
      });
    } else {
      return signUpData;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken("");
  }, []);

  const getUser = async () => {
    let userData;
    const userString = localStorage.getItem("user");
    let user = null;

    if (userString !== null) {
      user = JSON.parse(userString);
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if (user?.userId) {
      userData = await get(`users/${user?.userId}`, config);
    }
    if (userData?.status === 200 && userData !== null) {
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
