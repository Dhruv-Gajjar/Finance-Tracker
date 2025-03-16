import { Test, TestingModule } from '@nestjs/testing';
import { LatestTransactionService } from './latest-transaction.service';

describe('LatestTransactionService', () => {
  let service: LatestTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LatestTransactionService],
    }).compile();

    service = module.get<LatestTransactionService>(LatestTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
