import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class CustomCategoryService {
  constructor(private prismaService: PrismaService) {}

  create(createCustomCategoryDto: Prisma.CustomCategoryCreateInput) {
    return this.prismaService.customCategory.create({
      data: createCustomCategoryDto,
    });
  }

  findAll() {
    return this.prismaService.customCategory.findMany({});
  }

  findOne(id: number) {
    return this.prismaService.customCategory.findUnique({
      where: {
        id,
      },
    });
  }

  update(
    id: number,
    updateCustomCategoryDto: Prisma.CustomCategoryUpdateInput,
  ) {
    return this.prismaService.customCategory.update({
      where: {
        id,
      },
      data: updateCustomCategoryDto,
    });
  }

  remove(id: number) {
    return this.prismaService.customCategory.delete({
      where: {
        id,
      },
    });
  }
}
