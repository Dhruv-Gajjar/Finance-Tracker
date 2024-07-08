import { Module } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CustomCategoryController } from './custom-category.controller';
import { CustomCategoryService } from './custom-category.service';

@Module({
  controllers: [CustomCategoryController],
  providers: [CustomCategoryService, PrismaService],
})
export class CustomCategoryModule {}
