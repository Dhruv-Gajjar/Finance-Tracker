import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { ExpensesService } from 'src/expenses/expenses.service';
import { IncomesService } from 'src/incomes/incomes.service';

@Injectable()
export class ChartDataService {
  constructor(
    private prismaService: PrismaService,
    private incomeServices: IncomesService,
    private expenseServices: ExpensesService,
  ) {}

  async getChartData(userId: number) {
    const chartData = [];
    const incomesData = await this.incomeServices.findIncomeByUserId(userId);
    const expensesData = await this.expenseServices.findExpenseByUserId(userId);

    if (!incomesData && !expensesData)
      return { status: 500, message: 'No data found!' };

    if (incomesData && expensesData) {
      incomesData.map((income) => {
        const incomeObj = {
          id: 0,
          income: 0,
          date: new Date(),
        };
        incomeObj.id = income.id;
        incomeObj.income = income.amount;
        incomeObj.date = income.createdAt;
        chartData.push(incomeObj);
      });

      expensesData.map((expense) => {
        const expenseObj = {
          id: 0,
          expense: 0,
          date: new Date(),
        };

        expenseObj.id = expense.id;
        expenseObj.expense = expense.amount;
        expenseObj.date = expense.createdAt;
        chartData.push(expenseObj);
      });

      return {
        status: 200,
        message: 'Chart data fetch sucessfully',
        result: chartData,
      };
    }
  }
}
