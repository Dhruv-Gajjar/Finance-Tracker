import { IIncomeExpenseForm, IUser } from "@/utils/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IGlobalStore {
  userId: number | null;
  username: string | null;
  token: string | null;
  incomes: IIncomeExpenseForm[];
  expenses: IIncomeExpenseForm[];
  isLoggedIn: boolean;
  login: (user: IUser) => void;
  logout: () => void;
}

const useGlobalStore = create(
  persist<IGlobalStore>(
    (set) => ({
      userId: 0,
      username: null,
      token: null,
      incomes: [] as IIncomeExpenseForm[],
      expenses: [] as IIncomeExpenseForm[],
      isLoggedIn: false,
      login: (user: IUser) => {
        console.log("STORE_USER: ", user);
        set({
          isLoggedIn: true,
          userId: user.id,
          username: user.username,
          token: user.token,
        });
      },
      logout: () => {
        set({
          isLoggedIn: false,
          username: null,
          userId: null,
          token: null,
        });
        sessionStorage.clear();
      },
    }),
    { name: "user", storage: createJSONStorage(() => sessionStorage) }
  )
);

export default useGlobalStore;
