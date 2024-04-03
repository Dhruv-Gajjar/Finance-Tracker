"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Calendar } from "@/components/ui/calendar";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import useAuth from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { ExpenseTypes } from "@/utils/types";
import { useState } from "react";

interface IExpenseForm {
  title: string;
  description?: string;
  amount: number;
  date: string;
  expenseType: ExpenseTypes;
}

export function ExpenseFormModal() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IExpenseForm>();

  const [date, setDate] = useState<Date>();

  const onSubmit: SubmitHandler<IExpenseForm> = async (data) => {
    if (date) {
      const formattedDate = format(date, "dd/MM/yyyy");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Expenses</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expenses</DialogTitle>
        </DialogHeader>
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
                {...register("description", { required: true })}
              />
              {errors.description?.type === "required" && (
                <p className="text-red-400">Description is required</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                placeholder="Amount"
                {...register("amount", { required: true })}
              />
              {errors.amount?.type === "required" && (
                <p className="text-red-400">Amount is required</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="expenseType">Expense Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a expense type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Expense Types</SelectLabel>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="bill">Bill</SelectItem>
                    <SelectItem value="grocery">Grocery</SelectItem>
                    <SelectItem value="emi">Emi</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="subscribtion">Subscribtion</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
