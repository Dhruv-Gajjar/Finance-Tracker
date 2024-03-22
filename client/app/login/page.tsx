import AuthForm from "@/components/authForm/AuthForm";
import React from "react";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center mx-auto">
      <AuthForm title="Login" />
    </div>
  );
};

export default Login;
