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

interface IIncomeCategory {
  value: string;
  onChange: (value: string) => void;
  errors: FieldErrors<any>;
}

const IncomeCategory = (props: IIncomeCategory) => {
  const { onChange, value, errors } = props;
  return (
    <div>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger>
          <SelectValue placeholder="Select a expense type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="capitalize">
            <SelectLabel>Income Types</SelectLabel>
            <SelectItem value="salary">salary</SelectItem>
            <SelectItem value="bonus">bonus</SelectItem>
            <SelectItem value="investment">investment</SelectItem>
            <SelectItem value="gift">gift</SelectItem>
            <SelectItem value="rental_income">rental income</SelectItem>
            <SelectItem value="other">other</SelectItem>
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
