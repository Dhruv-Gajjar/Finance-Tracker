"use client";
import { getAllExpenses, getLatestExpenses } from "@/services/expense.service";
import { getAllIncomes, getLatestIncomes } from "@/services/income.service";
import { IIncomeExpenseForm } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useAuth from "./AuthContext";

interface ITransactionContext {
  incomes: IIncomeExpenseForm[];
  setIncomes: Dispatch<SetStateAction<IIncomeExpenseForm[]>>;
  expenses: IIncomeExpenseForm[];
  setExpenses: Dispatch<SetStateAction<IIncomeExpenseForm[]>>;
  latestTransactions: IIncomeExpenseForm[];
}

const TransactionContext = createContext<ITransactionContext | null>(null);

export const TransactionContextProvider = (props: { children: ReactNode }) => {
  const { user, token } = useAuth();
  const [incomes, setIncomes] = useState<IIncomeExpenseForm[]>([]);
  const [expenses, setExpenses] = useState<IIncomeExpenseForm[]>([]);
  const [latestIncomes, setLatestIncomes] = useState([]);
  const [latestExpenses, setLatestExpenses] = useState([]);
  const [latestTransactions, setLatestTransaction] = useState([]);

  //------ Incomes -------//

  useQuery({
    queryKey: ["incomes"],
    queryFn: async () => {
      const incomes = await getAllIncomes(token, user?.id!);
      console.log("IncomeData: ", incomes);
      setIncomes(incomes);
    },
  });

  useQuery({
    queryKey: ["latest-incomes"],
    queryFn: async () => {
      const latestIncomes = await getLatestIncomes(token, user?.id!);
      console.log("Latest-Incomes: ", latestIncomes);
      setLatestIncomes(latestIncomes);
    },
  });

  //---- Expenses -----//
  useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const allExpenses = await getAllExpenses(token, user?.id!);
      console.log("All-Expenses: ", allExpenses);
      setExpenses(allExpenses);
    },
  });

  useQuery({
    queryKey: ["latest-expenses"],
    queryFn: async () => {
      const latestExpenses = await getLatestExpenses(token, user?.id!);
      console.log("Latest-Expenses: ", latestExpenses);
      setLatestExpenses(latestExpenses);
    },
  });

  const filterTransactionByDate = () => {
    const latestTransation = [...latestIncomes, ...latestExpenses];
    const sortedTransaction = latestTransation
      ?.sort((a: IIncomeExpenseForm, b: IIncomeExpenseForm) => {
        return new Date(b?.createdAt) - new Date(a?.createdAt);
      })
      .slice(0, 5);
    setLatestTransaction(sortedTransaction);
  };

  useEffect(() => {
    filterTransactionByDate();
  }, [latestIncomes, latestExpenses]);

  const currentValues = useMemo(
    () => ({
      incomes,
      setIncomes,
      expenses,
      setExpenses,
      latestIncomes,
      latestExpenses,
      latestTransactions,
    }),
    [incomes, expenses, latestIncomes, latestExpenses, latestTransactions]
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
