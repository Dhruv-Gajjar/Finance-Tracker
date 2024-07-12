import { IIncomeExpenseForm } from "@/utils/types";
import React, { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface DescriptionProps {
  register: UseFormRegister<IIncomeExpenseForm>;
  errors?: FieldErrors<IIncomeExpenseForm>;
}

const Description: FC<DescriptionProps> = ({ register, errors }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="description">Description</Label>
      <Input
        id="description"
        placeholder="Description"
        {...register("description")}
      />
    </div>
  );
};

export default Description;
