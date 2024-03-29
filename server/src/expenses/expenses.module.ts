import { Module } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';

@Module({
  imports: [UsersModule],
  controllers: [ExpensesController],
  providers: [ExpensesService, PrismaService],
})
export class ExpensesModule {}
