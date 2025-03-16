import { Module } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { ExpensesService } from 'src/expenses/expenses.service';
import { IncomesModule } from 'src/incomes/incomes.module';
import { IncomesService } from 'src/incomes/incomes.service';
import { LatestTransactionController } from './latest-transaction.controller';
import { LatestTransactionService } from './latest-transaction.service';

@Module({
  imports: [IncomesModule, ExpensesModule],
  controllers: [LatestTransactionController],
  providers: [
    LatestTransactionService,
    IncomesService,
    ExpensesService,
    PrismaService,
  ],
})
export class LatestTransactionModule {}
