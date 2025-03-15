export type IUserFormData = {
  username: string;
  password: string;
  email: string;
};

// export interface IUserFormData {
//   id?: number;
//   userId?: number;
//   username: string;
//   email: string;
//   password?: string;
// }

export interface IUser {
  id: number;
  username: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface ICustomCategoryForm {
  categoryName: string;
  icon: string;
}

export interface IIncomeExpenseForm {
  title: string;
  description?: string;
  amount: number;
  date: Date | undefined;
  type: string;
  category?: string;
  categoryId: number;
  userId: number;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
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

export interface ICustomCategory {
  id?: number;
  name: string;
  icon: string;
  categoryType: string;
  userId: number;
}
