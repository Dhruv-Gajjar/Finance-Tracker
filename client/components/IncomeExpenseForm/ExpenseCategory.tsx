import { CustomCategory } from "@/utils/types";
import React, { FC } from "react";
import { FieldErrors } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ExpenseCategoryProps {
  value: string;
  onChange: (value: string) => void;
  errors: FieldErrors<any>;
  expenses: CustomCategory[];
}

const ExpenseCategory: FC<ExpenseCategoryProps> = ({
  errors,
  expenses,
  onChange,
  value,
}) => {
  return (
    <div>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger>
          <SelectValue placeholder="Select a expense type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="capitalize">
            <SelectLabel>Expense Types</SelectLabel>
            {expenses?.length > 0 ? (
              expenses?.map(
                (expense: CustomCategory) =>
                  expense.categoryType === "expense" && (
                    <SelectItem
                      key={expense?.id}
                      value={expense.id?.toString()!}
                    >
                      {expense.name} {expense.icon}
                    </SelectItem>
                  )
              )
            ) : (
              <p className="p-6 text-sm mx-auto text-primary">
                Please add a Expense Category
              </p>
            )}
          </SelectGroup>
        </SelectContent>
        {errors.type?.type === "required" && (
          <p className="text-red-400">Expense Category is required</p>
        )}
      </Select>
    </div>
  );
};

export default ExpenseCategory;
