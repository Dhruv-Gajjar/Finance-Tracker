import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { ExpensesService } from 'src/expenses/expenses.service';
import { IncomesService } from 'src/incomes/incomes.service';

@Injectable()
export class LatestTransactionService {
  constructor(
    private prismaService: PrismaService,
    private incomeServices: IncomesService,
    private expenseServices: ExpensesService,
  ) {}

  async getLatestTransactions(userId: number) {
    const incomesData = await this.incomeServices.findIncomeByUserId(userId);
    const expensesData = await this.expenseServices.findExpenseByUserId(userId);

    if (!incomesData && !expensesData)
      return { status: 500, message: 'No data found!' };

    const latestTransation = [...incomesData, ...expensesData];
    const sortedTransaction = latestTransation
      ?.sort((a, b) => {
        const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 5);

    return {
      status: 200,
      message: 'Latest Transaction fetch sucessfully',
      result: sortedTransaction,
    };
  }
}
