import { IIncomeExpenseForm } from "@/utils/types";
import React, { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface TitleProps {
  register: UseFormRegister<IIncomeExpenseForm>;
  errors: FieldErrors<IIncomeExpenseForm>;
  name: string;
}

const Title: FC<TitleProps> = ({ register, errors, name }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="title">{name}</Label>
      <Input
        id="title"
        placeholder="Title"
        {...register("title", { required: true })}
      />
      {errors.title?.type === "required" && (
        <p className="text-red-400">{name} is required</p>
      )}
    </div>
  );
};

export default Title;
