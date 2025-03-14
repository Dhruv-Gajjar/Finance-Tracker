import { FormSchema } from "@/schema/FormSchema";
import { ICustomCategory, ICustomCategoryForm } from "@/utils/types";
import { FC } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import CustomCategoryForm from "../IncomeExpenseForm/CustomCategoryForm";
import ExpenseCategory from "../IncomeExpenseForm/ExpenseCategory";
import IncomeCategory from "../IncomeExpenseForm/IncomeCategory";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FormControl, FormItem, FormLabel } from "../ui/form";

interface CustomCategoryProps {
  // register: UseFormRegister<IIncomeExpenseForm>;
  // errors?: FieldErrors<IIncomeExpenseForm>;
  // name: string;
  // field: ControllerRenderProps<IIncomeExpenseForm, "description">;
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  pathname: string;
  customCategoryData: ICustomCategory[];
  status: "error" | "pending" | "success";
}

const CustomCategory: FC<CustomCategoryProps> = ({
  form,
  customCategoryData,
  pathname,
  status,
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <FormItem>
        <FormLabel>Category</FormLabel>
        <FormControl>
          <Controller
            name="category"
            control={form.control} // Provide control from useForm
            rules={{ required: "Field is required" }}
            render={({ field }) => (
              <>
                <Dialog>
                  <DialogTitle>Custom Category</DialogTitle>
                  <DialogTrigger className="self-start" asChild>
                    <Button variant="ghost">Create a category</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      Create {pathname === "income" ? "Income" : "Expense"}{" "}
                      category
                    </DialogHeader>
                    <DialogDescription className="text-center">
                      Create you own custom category...
                    </DialogDescription>
                    <DialogContent>
                      <CustomCategoryForm type={pathname} />
                    </DialogContent>
                  </DialogContent>
                </Dialog>
                {pathname === "income" ? (
                  status === "pending" ? (
                    <div className="text-xl text-foreground">Loading...</div>
                  ) : (
                    <IncomeCategory
                      errors={form.formState.errors}
                      incomes={customCategoryData!}
                      // isSubmitted={form.formState.isSubmitted}
                      //   incomeField={field}
                      //   incomeRegister={form.register}
                    />
                  )
                ) : status == "pending" ? (
                  <div className="text-xl text-foreground">Loading...</div>
                ) : (
                  <ExpenseCategory
                    // errors={form.formState.errors}
                    // field={field}
                    expenses={customCategoryData!}
                    // register={form.register}
                    // isSubmitted={form.formState.isSubmitted}
                  />
                )}
              </>
            )}
          />
        </FormControl>
      </FormItem>
    </div>
  );
};

export default CustomCategory;
