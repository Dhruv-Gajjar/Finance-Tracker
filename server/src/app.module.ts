import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { ChartDataModule } from './chart-data/chart-data.module';
import { CustomCategoryModule } from './custom-category/custom-category.module';
import { PrismaService } from './db/prisma.service';
import { ExpensesModule } from './expenses/expenses.module';
import { IncomesModule } from './incomes/incomes.module';
import { UsersModule } from './users/users.module';
import { LatestTransactionModule } from './latest-transaction/latest-transaction.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ExpensesModule,
    IncomesModule,
    CustomCategoryModule,
    ChartDataModule,
    LatestTransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtStrategy],
})
export class AppModule {}
