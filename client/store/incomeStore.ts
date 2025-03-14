import { IIncomeExpenseForm } from "@/utils/types";
import { create } from "zustand";

interface IIncomeState {
  incomes: IIncomeExpenseForm[];
  addIncome: (income: IIncomeExpenseForm) => void;
}

const useIncomeStore = create((set) => ({
  incomes: [],
  addIncome: (income: IIncomeExpenseForm) =>
    set((state: IIncomeExpenseForm[]) => [...state, income]),
}));
