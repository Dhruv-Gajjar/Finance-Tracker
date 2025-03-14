import { FormSchema } from "@/schema/FormSchema";
import { IIncomeExpenseForm } from "@/utils/types";
import React, { FC } from "react";
import {
  ControllerRenderProps,
  FieldErrors,
  UseFormRegister,
  UseFormReturn,
} from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface DescriptionProps {
  // register: UseFormRegister<IIncomeExpenseForm>;
  // errors?: FieldErrors<IIncomeExpenseForm>;
  // name: string;
  // field: ControllerRenderProps<IIncomeExpenseForm, "description">;
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const Description: FC<DescriptionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="description"
                placeholder="Description"
                {...field}
                {...form.register("description")}
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default Description;
