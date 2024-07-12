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

interface IncomeCategoryProps {
  value: string;
  onChange: (value: string) => void;
  errors: FieldErrors<any>;
  incomes: CustomCategory[];
}

const IncomeCategory: FC<IncomeCategoryProps> = ({
  errors,
  incomes,
  onChange,
  value,
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
                (income: CustomCategory) =>
                  income.categoryType === "income" && (
                    <SelectItem key={income?.id} value={income.id?.toString()!}>
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
        {errors.type?.type === "required" && (
          <p className="text-red-400">Income Category is required</p>
        )}
      </Select>
    </div>
  );
};

export default IncomeCategory;
