export type IAuthForm = {
  username: string;
  password: string;
  email: string;
};

export interface ICustomCategoryForm {
  name: string;
  icon: string;
}

export enum Types {
  income,
  expense,
}

export enum ExpenseCategory {
  salary,
  bill,
  grocery,
  emi,
  rent,
  subscribtion,
  insurance,
  food,
}

export enum IncomeCategory {
  salary,
  bonus,
  investment,
  gift,
  rental_income,
  other,
}

export type Income = {
  id: number;
  title: string;
  description: string;
  type: Types;
  category: IncomeCategory;
  amount: number;
};

export type Expenses = {
  id: number;
  title: string;
  description: string;
  type: Types;
  category: ExpenseCategory;
  amount: number;
};
