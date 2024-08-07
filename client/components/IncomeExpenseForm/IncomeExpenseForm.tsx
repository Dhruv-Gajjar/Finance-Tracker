"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import useAuth from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { getAllCustomCategory } from "@/services/customCategory.service";
import { addExpenses } from "@/services/expense.service";
import { addIncome } from "@/services/income.service";
import { post } from "@/utils/axiosService";
import { CustomCategory, IIncomeExpenseForm, Types } from "@/utils/types";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Description from "../Description/Description";
import Title from "../Title/Title";
import CustomCategoryForm from "./CustomCategoryForm";
import ExpenseCategory from "./ExpenseCategory";
import IncomeCategory from "./IncomeCategory";

interface IncomeExpenseFormProps {
  pathname: string;
}

const IncomeExpenseForm: FC<IncomeExpenseFormProps> = ({ pathname }) => {
  const { user, token } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
    getValues,
  } = useForm<IIncomeExpenseForm>();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const queryClient = useQueryClient();

  const {
    status,
    error,
    data: customCategoryData,
  } = useQuery({
    queryKey: ["custom-category", user?.id],
    queryFn: () => getAllCustomCategory(user?.id!),
  });

  const { data: incomeData, mutate: incomeMutation } = useMutation({
    mutationFn: addIncome,
    onSuccess: (newIncome) => {
      queryClient.setQueryData(["incomes"], newIncome);
      console.log("NEW_INCOME: ", newIncome);
      reset();
      toast({
        value: "default",
        title: "Income created succesfully!",
        className: "bg-green-600",
      });
    },
  });

  const { data: expenseData, mutate: expenseMutation } = useMutation({
    mutationFn: addExpenses,
    onSuccess: (newExpense) => {
      queryClient.setQueryData(["expenses"], newExpense);
      console.log("NEW_EXPENSE: ", newExpense);
      reset();
      toast({
        value: "default",
        title: "Expense created succesfully!",
        className: "bg-green-600",
      });
    },
  });

  const onSubmit = async (formData: IIncomeExpenseForm) => {
    if (typeof formData?.amount === "string") {
      formData.amount = parseInt(formData?.amount);
    }
    if (date && user && user.id) {
      const formattedDate = format(date, "dd-MM-yyyy");
      const categoryId = parseInt(formData?.category!); // Ensure this is the ID of the CustomCategory
      formData = {
        ...formData,
        date: formattedDate,
        userId: user?.id,
        token: token,
        type: pathname === "income" ? "income" : "expense",
        categoryId: categoryId,
      };
      delete formData?.category;
      if (pathname === "income") {
        incomeMutation(formData);
      }

      if (pathname === "expense") {
        expenseMutation(formData);
      }
    }
    reset();
  };

  return (
    <div className="w-100 grid gap-4 py-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Title name="Title" register={register} errors={errors} />
        <Description register={register} />
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="number"
            id="amount"
            placeholder="Amount"
            {...register("amount", { required: true })}
          />
          {errors.amount?.type === "required" && (
            <p className="text-red-400">Amount is required</p>
          )}
        </div>
        {/* <div className="flex flex-col space-y-1.5">
          <Label htmlFor="types">Types</Label>
          <Controller
            name="type"
            control={control} // Provide control from useForm
            rules={{ required: "Field is required" }}
            render={({ field: { onChange, value } }) => (
              <>
                <Select
                  onValueChange={onChange}
                  value={value}
                  defaultValue="income"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="capitalize">
                      <SelectItem defaultValue="income" value="income">
                        income
                      </SelectItem>
                      <SelectItem value="expense">expense</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                  {errors.type?.type === "required" && (
                    <p className="text-red-400">Type is required</p>
                  )}
                </Select>
              </>
            )}
          />
        </div> */}
        <div className="flex flex-col space-y-1.5">
          {/*
              TODO: both type and category required message goes away when i select either one of them
            */}
          <Label htmlFor="category">Category</Label>
          <Controller
            name="category"
            control={control} // Provide control from useForm
            rules={{ required: "Field is required" }}
            render={({ field: { onChange, value } }) => (
              <>
                <Dialog>
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
                      errors={errors}
                      onChange={onChange}
                      value={value!}
                      incomes={customCategoryData!}
                    />
                  )
                ) : status == "pending" ? (
                  <div className="text-xl text-foreground">Loading...</div>
                ) : (
                  <ExpenseCategory
                    errors={errors}
                    onChange={onChange}
                    value={value!}
                    expenses={customCategoryData!}
                  />
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button type="submit">
          Add {pathname === "income" ? "Income" : "Expense"}
        </Button>
      </form>
    </div>
  );
};

export default IncomeExpenseForm;
