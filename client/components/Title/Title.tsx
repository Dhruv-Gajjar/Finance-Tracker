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

interface TitleProps {
  // register: UseFormRegister<IIncomeExpenseForm>;
  // errors: FieldErrors<IIncomeExpenseForm>;
  // name: string;
  // field: ControllerRenderProps<IIncomeExpenseForm, "title">;
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const Title: FC<TitleProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="title"
                placeholder="Title"
                {...field}
                {...form.register("title")}
              />
              {/* {form.formState.errors.title?.type === "required" && (
                <p className="text-red-400"> is required</p>
              )} */}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default Title;
