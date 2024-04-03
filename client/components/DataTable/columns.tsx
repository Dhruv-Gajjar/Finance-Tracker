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

      return (
        <div className="flex gap-2 items-center font-bold">$ {amount}</div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const expenseType: React.ReactNode = row.getValue("type");

      return <div className="flex gap-2 items-center">{expenseType}</div>;
    },
  },
];
