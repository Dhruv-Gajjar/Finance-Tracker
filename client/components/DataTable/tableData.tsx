import { Expenses } from "@/utils/types";

type Expenses = {
  id: number;
  title: string;
  description: string;
  type: Expenses;
  amount: number;
};
