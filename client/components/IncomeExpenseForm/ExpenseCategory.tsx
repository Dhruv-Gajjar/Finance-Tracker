import React from "react";
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

interface IExpenseCategory {
  value: string;
  onChange: (value: string) => void;
  errors: FieldErrors<any>;
}

const ExpenseCategory = (props: IExpenseCategory) => {
  const { onChange, value, errors } = props;
  return (
    <div>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger>
          <SelectValue placeholder="Select a expense type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="capitalize">
            <SelectLabel>Expense Types</SelectLabel>
            <SelectItem value="bill">bill</SelectItem>
            <SelectItem value="grocery">grocery</SelectItem>
            <SelectItem value="emi">emi</SelectItem>
            <SelectItem value="rent">rent</SelectItem>
            <SelectItem value="subscribtion">subscribtion</SelectItem>
            <SelectItem value="insurance">insurance</SelectItem>
            <SelectItem value="food">food</SelectItem>
            <SelectItem value="travel">travel</SelectItem>
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
