export type IAuthForm = {
  username: string;
  password: string;
  email: string;
};

export enum ExpenseTypes {
  salary,
  bill,
  grocery,
  emi,
  rent,
  subscribtion,
  insurance,
  food,
}

export type Expenses = {
  id: number;
  title: string;
  description: string;
  type: ExpenseTypes;
  amount: number;
};
