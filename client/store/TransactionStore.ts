import { IIncomeExpenseForm } from "@/utils/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IIncomeStore {
  incomes: IIncomeExpenseForm[];
  addIncome: (income: IIncomeExpenseForm) => void;
  setIncomeData: (income: IIncomeExpenseForm[]) => void;
}

const useTransactionStore = create<IIncomeStore>()(
  devtools(
    persist(
      (set) => ({
        incomes: [] as IIncomeExpenseForm[],
        addIncome: (income: IIncomeExpenseForm) =>
          set((state) => ({
            incomes: [...state.incomes, income],
          })),
        setIncomeData: (income: IIncomeExpenseForm[]) =>
          set((state) => ({
            incomes: income,
          })),
      }),
      { name: "transactions" }
    )
  )
);
export default useTransactionStore;
