import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class IncomesService {
  constructor(private prismaService: PrismaService) {}

  create(createIncomeDto: Prisma.IncomesCreateInput) {
    return this.prismaService.incomes.create({
      data: createIncomeDto,
    });
  }

  async findAll() {
    return await this.prismaService.expenses.findMany({});
  }

  async findIncomeByUserId(id: number) {
    return await this.prismaService.incomes.findMany({
      where: {
        userId: id,
      },
    });
  }

  async update(id: number, updateIncomeDto: Prisma.IncomesUpdateInput) {
    return await this.prismaService.incomes.update({
      where: {
        id,
      },
      data: updateIncomeDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.incomes.delete({
      where: {
        id,
      },
    });
  }
}
