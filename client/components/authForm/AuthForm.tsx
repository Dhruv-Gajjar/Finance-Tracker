"use client";
import { IAuthForm } from "@/utils/types";
import { SubmitHandler, useForm } from "react-hook-form";

// shadcn ui
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { get, post } from "@/utils/axiosService";
import { post } from "@/utils/axiosService";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AuthForm = (props: { title: string }) => {
  const [token, setToken] = useState<string>("");
  const router = useRouter();
  const { title } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAuthForm>();

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    try {
      if (title === "Login") {
        const loginData = await post("/auth/login", data);
        console.log("LoginData: ", loginData);
        setToken(loginData.accessToken);
        localStorage.setItem("token", loginData.accessToken);
        console.log("ACCES_TOKEN: ", token);
        toast.success("Logged in succesfully!", {
          position: "top-left",
        });
        router.push("/");
      } else {
        const signupData = await post("/auth/register", data);
        toast.success(signupData.Data, {
          position: "top-left",
        });
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error, {
        position: "top-left",
      });
    }
  };

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {title === "Login" ? (
            <CardDescription>{title} into you account.</CardDescription>
          ) : (
            <CardDescription>{title} to create an account.</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  {...register("username", { required: true })}
                />
                {errors.username?.type === "required" && (
                  <p className="text-red-400">Username is required</p>
                )}
              </div>
              {title === "Signup" && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-400">Email is required</p>
                  )}
                </div>
              )}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-400">Password is required</p>
                )}
              </div>
              <div>
                {title === "Login" ? (
                  <Label htmlFor="signup">
                    Don't have an account?.{" "}
                    <span className="text-blue-600">
                      <Link href="/signup">Signup</Link>
                    </span>
                  </Label>
                ) : (
                  <Label htmlFor="signup">
                    Already have and account?.{" "}
                    <span className="text-blue-600">
                      <Link href="/login">Login</Link>
                    </span>
                  </Label>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
