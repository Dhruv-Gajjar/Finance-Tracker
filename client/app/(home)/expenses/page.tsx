import { IncomeExpenseForm } from "@/components/IncomeExpenseForm/IncomeExpenseForm";
import React from "react";

const Expenses = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between w-[100%] p-8 bg-gray-200 dark:bg-zinc-900">
      <h4 className="font-bold text-xl self-start">Add Expense</h4>
      <div className="w-[20rem]">
        <IncomeExpenseForm />
      </div>
    </div>
  );
};

export default Expenses;
