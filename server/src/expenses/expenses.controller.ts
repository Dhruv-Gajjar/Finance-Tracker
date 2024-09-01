import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createExpenseDto: Prisma.ExpensesCreateInput) {
    return this.expensesService.create(createExpenseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.expensesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.expensesService.findExpenseByUserId(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateExpenseDto: Prisma.ExpensesUpdateInput,
  ) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.expensesService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/latest-expenses')
  getLatestExpenses(@Param('id') id: string) {
    return this.expensesService.getLatestExpenses(+id);
  }
}
