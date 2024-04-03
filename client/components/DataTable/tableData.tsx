import { ExpenseTypes } from "@/utils/types";

type Expenses = {
  id: number;
  title: string;
  description: string;
  type: ExpenseTypes;
  amount: number;
};
