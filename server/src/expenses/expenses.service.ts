import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExpensesService {
  constructor(private prismaService: PrismaService) {}

  async create(createExpenseDto: Prisma.ExpensesCreateInput) {
    return this.prismaService.expenses.create({
      data: createExpenseDto,
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaService.expenses.findMany({});
  }

  async findOne(id: number) {
    return await this.prismaService.expenses.findUnique({
      where: {
        id,
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
}
