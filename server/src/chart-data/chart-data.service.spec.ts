import { Test, TestingModule } from '@nestjs/testing';
import { ChartDataService } from './chart-data.service';

describe('ChartDataService', () => {
  let service: ChartDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChartDataService],
    }).compile();

    service = module.get<ChartDataService>(ChartDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
