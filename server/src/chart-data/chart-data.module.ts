import { Module } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { ExpensesService } from 'src/expenses/expenses.service';
import { IncomesModule } from 'src/incomes/incomes.module';
import { IncomesService } from 'src/incomes/incomes.service';
import { ChartDataController } from './chart-data.controller';
import { ChartDataService } from './chart-data.service';

@Module({
  imports: [IncomesModule, ExpensesModule],
  controllers: [ChartDataController],
  providers: [ChartDataService, IncomesService, ExpensesService, PrismaService],
})
export class ChartDataModule {}
