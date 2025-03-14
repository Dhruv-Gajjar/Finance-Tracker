import { IIncomeExpenseForm } from "./types";

export function calculateTotalExpenseByType(
  expenseData: IIncomeExpenseForm[],
  expenseType: string
) {
  return expenseData.reduce((total, expense) => {
    if (expense.type === expenseType) {
      return total + expense.amount;
    }
    return total;
  }, 0);
}
