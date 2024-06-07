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
import { post } from "@/utils/axiosService";
import { DialogClose } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomCategoryForm from "./CustomCategoryForm";
import ExpenseCategory from "./ExpenseCategory";
import IncomeCategory from "./IncomeCategory";

interface IIncomeExpenseForm {
  title: string;
  description?: string;
  amount: number;
  date: string;
  type: string;
  category: string;
  userId: number;
}

export function IncomeExpenseForm() {
  const { user, token } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm<IIncomeExpenseForm>({
    defaultValues: {
      type: "income",
    },
  });
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const incomeExpenseType = watch("type");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const onSubmit = async (data: IIncomeExpenseForm) => {
    if (typeof data?.amount === "string") {
      data.amount = parseInt(data?.amount);
    }
    if (date && user && user.id) {
      const formattedDate = format(date, "dd-MM-yyyy");
      data = { ...data, date: formattedDate, userId: user?.id };
      await post("/expenses", data, config);
      toast({
        title: "Expense added succesfully",
        className: "bg-green-600",
        duration: 2000,
      });
    }
    reset();
  };

  return (
    <div className="grid gap-4 py-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Title"
            {...register("title", { required: true })}
          />
          {errors.title?.type === "required" && (
            <p className="text-red-400">Title is required</p>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Description"
            {...register("description")}
          />
          {/* {errors.description?.type === "" && (
              <p className="text-red-400">Description is required</p>
            )} */}
        </div>
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
        <div className="flex flex-col space-y-1.5">
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
        </div>
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
                      Create{" "}
                      {incomeExpenseType === "income" ? "Income" : "Expense"}{" "}
                      category
                    </DialogHeader>
                    <DialogDescription className="text-center">
                      Create you own custom category...
                    </DialogDescription>
                    <CustomCategoryForm />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant={"secondary"}
                          onClick={() => {
                            reset();
                          }}
                        >
                          Cancle
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                {incomeExpenseType === "income" ? (
                  <IncomeCategory
                    errors={errors}
                    onChange={onChange}
                    value={value}
                  />
                ) : (
                  <ExpenseCategory
                    errors={errors}
                    onChange={onChange}
                    value={value}
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
        <Button type="submit">Add Expense</Button>
      </form>
    </div>
  );
}
