import { ICustomCategory, IIncomeExpenseForm } from "@/utils/types";
import { register } from "module";
import React, { FC, useEffect } from "react";
import {
  ControllerRenderProps,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface IncomeCategoryProps {
  onChange: (value: string) => void;
  errors: FieldErrors<IIncomeExpenseForm>;
  incomes: ICustomCategory[];
  value: string;
  // isSubmitted: boolean;
  // incomeField: any;
  // incomeRegister: UseFormRegister<IIncomeExpenseForm>;
}

const IncomeCategory: FC<IncomeCategoryProps> = ({
  errors,
  incomes,
  onChange,
  value,
  // isSubmitted,
  // incomeRegister,
  // incomeField,
}) => {
  return (
    <div>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger>
          <SelectValue placeholder="Select a Income type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="capitalize">
            <SelectLabel>Income Types</SelectLabel>
            {incomes?.length > 0 ? (
              incomes?.map(
                (income: ICustomCategory) =>
                  income.categoryType === "income" && (
                    <SelectItem
                      key={income?.id}
                      value={income?.id?.toString()!}
                    >
                      {income.name} {income.icon}
                    </SelectItem>
                  )
              )
            ) : (
              <p className="p-6 text-sm mx-auto text-primary">
                Please add a Income Category
              </p>
            )}
          </SelectGroup>
        </SelectContent>
        {errors.category?.message && (
          <p className="text-red-400">{errors.category.message}</p>
        )}
      </Select>
    </div>
  );
};

export default IncomeCategory;
