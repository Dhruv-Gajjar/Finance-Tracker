"use client";
import { getAllExpenses, getLatestExpenses } from "@/services/expense.service";
import { getAllIncomes, getLatestIncomes } from "@/services/income.service";
import useGlobalStore from "@/store/GlobalStore";
import useTransactionStore from "@/store/TransactionStore";
import { IIncomeExpenseForm } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useAuth from "./AuthContext";

interface ITransactionContext {
  expenses: IIncomeExpenseForm[];
  setExpenses: Dispatch<SetStateAction<IIncomeExpenseForm[]>>;
  latestTransactions: IIncomeExpenseForm[];
}

const TransactionContext = createContext<ITransactionContext | null>(null);

export const TransactionContextProvider = (props: { children: ReactNode }) => {
  const { token, userId } = useGlobalStore();
  const { setIncomeData } = useTransactionStore();
  // const [incomes, setIncomes] = useState<IIncomeExpenseForm[]>([]);
  const [expenses, setExpenses] = useState<IIncomeExpenseForm[]>([]);
  const [latestIncomes, setLatestIncomes] = useState([]);
  const [latestExpenses, setLatestExpenses] = useState([]);
  const [latestTransactions, setLatestTransaction] = useState([]);

  //------ Incomes -------//

  useQuery({
    queryKey: ["incomes"],
    queryFn: async () => {
      let incomes: IIncomeExpenseForm[] = [];
      if (token && userId) {
        incomes = await getAllIncomes(token, userId);
        console.log("IncomeData: ", incomes);
        setIncomeData(incomes);
      } else {
        console.log("No Token or User Found...");
      }
      return incomes;
    },
  });

  const { data: latestIncome } = useQuery({
    queryKey: ["latest-incomes"],
    queryFn: async () => {
      if (token && userId) {
        const latestIncomes = await getLatestIncomes(token, userId);
        console.log("Latest-Incomes: ", latestIncome);
        setLatestIncomes(latestIncomes);
      }
      return latestIncomes;
    },
  });

  //---- Expenses -----//
  useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      if (token && userId) {
        const allExpenses = await getAllExpenses(token, userId);
        console.log("All-Expenses: ", allExpenses);
        setExpenses(allExpenses);
        return allExpenses;
      }
    },
  });

  const { data: latestExpense } = useQuery({
    queryKey: ["latest-expenses"],
    queryFn: async () => {
      if (token && userId) {
        const latestExpenses = await getLatestExpenses(token, userId);
        console.log("Latest-Expenses: ", latestExpense);
        setLatestExpenses(latestIncomes);
      }
      return latestExpenses;
    },
  });

  const filterTransactionByDate = useCallback(() => {
    const latestTransation = [...latestIncomes, ...latestExpenses];
    const sortedTransaction = latestTransation
      ?.sort((a: IIncomeExpenseForm, b: IIncomeExpenseForm) => {
        const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 5);
    setLatestTransaction(sortedTransaction);
    return sortedTransaction;
  }, [latestIncomes, latestExpenses]);

  useEffect(() => {
    filterTransactionByDate();
  }, [latestIncomes, latestExpenses, filterTransactionByDate]);

  const currentValues = useMemo(
    () => ({
      expenses,
      setExpenses,
      // latestIncomes,
      latestIncome,
      // latestExpenses,
      latestExpense,
      latestTransactions,
    }),
    [expenses, latestIncome, latestExpense, latestTransactions]
  );

  return (
    <TransactionContext.Provider value={currentValues}>
      {props?.children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const incomeExpenseContext = useContext(TransactionContext);

  if (incomeExpenseContext == null) {
    throw new Error("Transaction Context Not Found!");
  }

  return incomeExpenseContext;
};
