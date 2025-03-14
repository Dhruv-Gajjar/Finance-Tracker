import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChartDataService } from './chart-data.service';

@Controller('chart-data')
export class ChartDataController {
  constructor(private readonly chartDataService: ChartDataService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  getChartData(@Param('userId') userId: string) {
    return this.chartDataService.getChartData(+userId);
  }
}
