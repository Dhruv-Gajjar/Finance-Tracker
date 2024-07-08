import { Test, TestingModule } from '@nestjs/testing';
import { CustomCategoryService } from './custom-category.service';

describe('CustomCategoryService', () => {
  let service: CustomCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomCategoryService],
    }).compile();

    service = module.get<CustomCategoryService>(CustomCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
