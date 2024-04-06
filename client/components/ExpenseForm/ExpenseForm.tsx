"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

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
import { useToast } from "@/components/ui/use-toast";
import useAuth from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { post } from "@/utils/axiosService";
import { useState } from "react";

interface IExpenseForm {
  title: string;
  description?: string;
  amount: number;
  date: string;
  type: string;
  userId: number;
}

export function ExpenseForm() {
  const { user, token } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IExpenseForm>();
  const { toast } = useToast();

  const [date, setDate] = useState<Date>();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const onSubmit = async (data: IExpenseForm) => {
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
          <Label htmlFor="type">Expense Type</Label>
          <Controller
            name="type"
            control={control} // Provide control from useForm
            rules={{ required: "Field is required" }}
            render={({ field: { onChange, value } }) => (
              <>
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a expense type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Expense Types</SelectLabel>
                      <SelectItem value="salary">salary</SelectItem>
                      <SelectItem value="bill">bill</SelectItem>
                      <SelectItem value="grocery">grocery</SelectItem>
                      <SelectItem value="emi">emi</SelectItem>
                      <SelectItem value="rent">rent</SelectItem>
                      <SelectItem value="subscribtion">subscribtion</SelectItem>
                      <SelectItem value="insurance">insurance</SelectItem>
                      <SelectItem value="food">food</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                  {errors.type && (
                    <p className="text-red-400">Expense Type is required</p>
                  )}
                </Select>
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
