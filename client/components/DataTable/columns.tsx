"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UtensilsCrossed } from "lucide-react";
import { DetailedHTMLProps, HTMLAttributes } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Expenses = {
  id: number;
  title: string;
  description: string;
  type: ExpenseTypes;
  amount: number;
};

enum ExpenseTypes {
  salary,
  bill,
  grocery,
  emi,
  rent,
  subscribtion,
  insurance,
  food,
}

export const columns: ColumnDef<Expenses>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount: React.ReactNode = row.getValue("amount");
      return <div className="flex gap-2 items-center">$ {amount}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const expenseType: React.ReactNode = row.getValue("type");
      return (
        <div className="flex gap-2 items-center capitalize">
          <p
            className={`${
              expenseType === "food"
                ? "bg-teal-200 text-teal-600"
                : expenseType === "salary"
                ? "bg-green-200 text-green-600"
                : expenseType === "bill"
                ? "bg-yellow-200 text-yellow-600"
                : expenseType === "subscribtion"
                ? "bg-red-200 text-red-600"
                : expenseType === "emi"
                ? "bg-orange-200 text-orange-600"
                : expenseType === "grocery"
                ? "bg-cyan-200 text-cyan-600"
                : expenseType === "insurance"
                ? "bg-blue-200 text-blue-600"
                : expenseType === "rent"
                ? "bg-purple-200 text-purple-600"
                : ""
            } px-4 py-1 rounded-xl font-bold`}
          >
            {expenseType}
          </p>
        </div>
      );
    },
  },
];
