import { Test, TestingModule } from '@nestjs/testing';
import { LatestTransactionController } from './latest-transaction.controller';
import { LatestTransactionService } from './latest-transaction.service';

describe('LatestTransactionController', () => {
  let controller: LatestTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LatestTransactionController],
      providers: [LatestTransactionService],
    }).compile();

    controller = module.get<LatestTransactionController>(LatestTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
