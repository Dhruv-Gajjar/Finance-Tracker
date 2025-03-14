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
import { FormSchema } from "@/schema/FormSchema";
import { getAllCustomCategory } from "@/services/customCategory.service";
import { addExpenses } from "@/services/expense.service";
import { addIncome } from "@/services/income.service";
import { post } from "@/utils/axiosService";
import { ICustomCategory, IIncomeExpenseForm, Types } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import CustomCategory from "../CustomCategory/CustomCategory";
import Description from "../Description/Description";
import Title from "../Title/Title";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import CustomCategoryForm from "./CustomCategoryForm";
import ExpenseCategory from "./ExpenseCategory";
import IncomeCategory from "./IncomeCategory";

interface IncomeExpenseFormProps {
  pathname: string;
}

// const FormSchema = z.object({
//   title: z.string({
//     required_error: "Name is required",
//   }),
//   description: z.string({
//     required_error: "Description is required",
//   }),
//   amount: z.number({
//     required_error: "Amount is required",
//   }),
//   category: z.string({
//     required_error: "Category is required",
//   }),
//   type: z.string({
//     required_error: "Category is required",
//   }),
//   date: z.date({
//     required_error: "A date of birth is required.",
//   }),
// });

const IncomeExpenseForm: FC<IncomeExpenseFormProps> = ({ pathname }) => {
  const { user, token } = useAuth();
  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   reset,
  //   formState: { errors, isSubmitted, isSubmitSuccessful },
  // } = useForm<IIncomeExpenseForm>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit",
  });
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>();
  // const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
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
      form.reset();
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
      form.reset();
      toast({
        value: "default",
        title: "Expense created succesfully!",
        className: "bg-green-600",
      });
    },
  });

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    console.log("FMData: ", formData, date);
    if (typeof formData?.amount === "string") {
      formData.amount = parseInt(formData?.amount);
    }
    if (date && user && user.id) {
      const formattedDate = format(date, "dd-MM-yyyy");
      const categoryId = parseInt(formData?.category!); // Ensure this is the ID of the CustomCategory
      const finalFormData: IIncomeExpenseForm = {
        ...formData,
        date: new Date(formattedDate),
        userId: user?.id,
        token: token,
        type: pathname === "income" ? "income" : "expense",
        categoryId: categoryId,
      };
      // formData = {
      //   ...formData,
      //   date: new Date(formattedDate),
      //   userId: user?.id,
      //   token: token,
      //   type: pathname === "income" ? "income" : "expense",
      //   categoryId: categoryId,
      // };
      delete finalFormData?.category;
      if (pathname === "income") {
        incomeMutation(finalFormData);
      }

      if (pathname === "expense") {
        expenseMutation(finalFormData);
      }
    }
    form.reset();
  };

  const onError = (errors: FieldErrors<IIncomeExpenseForm>) => {
    console.log("Form Validation Errors: ", errors);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <div className="flex flex-col space-y-1.5">
                  <Input id="title" placeholder="Title" {...field} />
                  {/* {form.formState.errors.title?.type === "required" && (
                <p className="text-red-400"> is required</p>
              )} */}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        {/* <Description form={form} /> */}
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
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        {/* <Description register={form.register} /> */}
        <div className="flex flex-col space-y-1.5">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <div>
                    <Input {...field} type="number" placeholder="Amount" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          {/* <Label htmlFor="amount">Amount</Label>
          <Input
            type="number"
            id="amount"
            placeholder="Amount"
            {...form.register("amount", { required: true })}
          />
          {form.formState.errors.amount?.type === "required" && (
            <p className="text-red-400">Amount is required</p>
          )} */}
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
        {/* --------- Custom Category -------- */}

        {/* <CustomCategory
          form={form}
          customCategoryData={customCategoryData!}
          pathname={pathname}
          status={status}
        /> */}
        {/* <div className="flex flex-col space-y-1.5">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
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
                          <DialogTrigger className="self-start" asChild>
                            <Button variant="ghost">Create a category</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              Create{" "}
                              {pathname === "income" ? "Income" : "Expense"}{" "}
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
                            <div className="text-xl text-foreground">
                              Loading...
                            </div>
                          ) : (
                            <IncomeCategory
                              errors={form.formState.errors}
                              incomes={customCategoryData!}
                              // isSubmitted={form.formState.isSubmitted}
                              incomeField={field}
                              //   incomeRegister={form.register}
                            />
                          )
                        ) : status == "pending" ? (
                          <div className="text-xl text-foreground">
                            Loading...
                          </div>
                        ) : (
                          <ExpenseCategory
                            // errors={form.formState.errors}
                            expenseField={field}
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
            )}
          />
        </div> */}
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
                        <div className="text-xl text-foreground">
                          Loading...
                        </div>
                      ) : (
                        <IncomeCategory
                          errors={form.formState.errors}
                          incomes={customCategoryData!}
                          onChange={field.onChange}
                          value={field.value}
                          // isSubmitted={form.formState.isSubmitted}
                          // register={form.register}
                        />
                      )
                    ) : status == "pending" ? (
                      <div className="text-xl text-foreground">Loading...</div>
                    ) : (
                      <ExpenseCategory
                        errors={form.formState.errors}
                        // field={field}
                        expenses={customCategoryData!}
                        value={field.value}
                        onChange={field.onChange}
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
        {/* --------- Custom Category End ---------- */}

        <div className="flex flex-col space-y-1.5">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        {...field}
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Enter you date.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
        <Button type="submit">
          Add {pathname === "income" ? "Income" : "Expense"}
        </Button>
      </form>
    </Form>
    // <div className="w-100 grid gap-4 py-4">
    // </div>
  );
};

export default IncomeExpenseForm;
