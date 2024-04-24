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
import { IncomesService } from './incomes.service';

@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createIncomeDto: Prisma.IncomesCreateInput) {
    return this.incomesService.create(createIncomeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.incomesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incomesService.findIncomeByUserId(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIncomeDto: Prisma.IncomesUpdateInput,
  ) {
    return this.incomesService.update(+id, updateIncomeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incomesService.remove(+id);
  }
}
