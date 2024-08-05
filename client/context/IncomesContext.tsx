"use client";
import { IIncomeExpenseForm } from "@/utils/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

interface ITransactionContext {
  incomes: IIncomeExpenseForm[];
  setIncomes: Dispatch<SetStateAction<IIncomeExpenseForm[]>>;
  expenses: IIncomeExpenseForm[];
  setExpenses: Dispatch<SetStateAction<IIncomeExpenseForm[]>>;
}

const TransactionContext = createContext<ITransactionContext | null>(null);

export const TransactionContextProvider = (props: { children: ReactNode }) => {
  const [incomes, setIncomes] = useState<IIncomeExpenseForm[]>([]);
  const [expenses, setExpenses] = useState<IIncomeExpenseForm[]>([]);

  const currentValues = useMemo(
    () => ({
      incomes,
      setIncomes,
      expenses,
      setExpenses,
    }),
    [incomes, expenses]
  );

  return (
    <TransactionContext.Provider value={currentValues}>
      {props?.children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const incomeContext = useContext(TransactionContext);

  if (incomeContext == null) {
    throw new Error("Transaction Context Not Found!");
  }

  return incomeContext;
};
