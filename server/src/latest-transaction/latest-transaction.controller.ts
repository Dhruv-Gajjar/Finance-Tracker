import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LatestTransactionService } from './latest-transaction.service';

@Controller('latest-transaction')
export class LatestTransactionController {
  constructor(
    private readonly latestTransactionService: LatestTransactionService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  getLatestTransactions(@Param('userId') userId: string) {
    return this.latestTransactionService.getLatestTransactions(+userId);
  }
}
