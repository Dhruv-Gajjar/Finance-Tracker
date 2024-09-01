import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private prismaService: PrismaService) {}

  async create(createExpenseDto: Prisma.ExpensesCreateInput) {
    return this.prismaService.expenses.create({
      data: createExpenseDto,
    });
  }

  async findAll() {
    return await this.prismaService.expenses.findMany({});
  }

  async findExpenseByUserId(userId: number) {
    return await this.prismaService.expenses.findMany({
      where: {
        userId,
      },
    });
  }

  async update(id: number, updateExpenseDto: Prisma.ExpensesUpdateInput) {
    return await this.prismaService.expenses.update({
      where: {
        id,
      },
      data: updateExpenseDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.expenses.delete({
      where: {
        id,
      },
    });
  }

  async getLatestExpenses(userId: number) {
    const expenseData = await this.prismaService.expenses.findMany({
      where: {
        userId,
      },
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return expenseData;
  }
}
