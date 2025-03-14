import { Test, TestingModule } from '@nestjs/testing';
import { ChartDataController } from './chart-data.controller';
import { ChartDataService } from './chart-data.service';

describe('ChartDataController', () => {
  let controller: ChartDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChartDataController],
      providers: [ChartDataService],
    }).compile();

    controller = module.get<ChartDataController>(ChartDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
