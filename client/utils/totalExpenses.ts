import { ExpenseTypes, Expenses } from "./types";

export function calculateTotalExpenseByType(
  expenseData: Expenses[],
  expenseType: ExpenseTypes
) {
  return expenseData.reduce((total, expense) => {
    if (expense.type === expenseType) {
      return total + expense.amount;
    }
    return total;
  }, 0);
}
