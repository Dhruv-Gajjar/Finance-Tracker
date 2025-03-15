"use client";
import { toast } from "@/components/ui/use-toast";
import { getUserById } from "@/services/userService.service";
import useGlobalStore from "@/store/GlobalStore";
import { get, post } from "@/utils/axiosService";
import { checkTokenExpiration } from "@/utils/checkTokenExpiration";
import { IUser, IUserFormData } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FC,
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
  token: string | null;
  login: (data: IUserFormData) => Promise<void>;
  signUp: (data: IUserFormData) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider: FC<AuthProviderProps> = ({ children }) => {
  const { login: storeLogin, logout: storeLogout, token } = useGlobalStore();
  const queryClient = useQueryClient();

  const router = useRouter();

  useEffect(() => {
    if (token) {
      const tokenExpired = checkTokenExpiration(token);
      if (tokenExpired) {
        refreshToken();
      }
    }
  }, [token]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let user = localStorage.getItem("user");

      console.log("LS_USER: ", user);
    }
  }, []);

  const login = useCallback(
    async (userData: IUserFormData): Promise<void> => {
      const loginData: AxiosResponse = await post("/auth/login", userData);
      if (loginData.status === 200 && loginData.data) {
        console.log("LoginData: ", loginData.data);
        storeLogin(loginData.data.response);
        router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: loginData.data.message,
        });
      }
    },
    [router, storeLogin]
  );

  const signUp = useCallback(async (data: IUserFormData) => {
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
    storeLogout();
    router.push("/login");
  }, [storeLogout, router]);

  const refreshToken = async () => {
    const tempRefreshToken = localStorage.getItem("refreshToken");
    if (tempRefreshToken) {
      const refreshTokenData = await post("auth/refresh", {
        refresh: tempRefreshToken,
      });
      if (refreshTokenData.status === 200) {
        localStorage.removeItem("token");
        // setToken(refreshTokenData?.access_token);
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
      token,
      login,
      signUp,
      logout,
    }),
    [token, login, signUp, logout]
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
