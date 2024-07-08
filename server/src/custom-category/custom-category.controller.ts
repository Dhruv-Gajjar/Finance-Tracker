import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CustomCategoryService } from './custom-category.service';

@Controller('custom-category')
export class CustomCategoryController {
  constructor(private readonly customCategoryService: CustomCategoryService) {}

  @Post()
  create(@Body() createCustomCategoryDto: Prisma.CustomCategoryCreateInput) {
    return this.customCategoryService.create(createCustomCategoryDto);
  }

  @Get()
  findAll() {
    return this.customCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomCategoryDto: Prisma.CustomCategoryUpdateInput,
  ) {
    return this.customCategoryService.update(+id, updateCustomCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customCategoryService.remove(+id);
  }
}
