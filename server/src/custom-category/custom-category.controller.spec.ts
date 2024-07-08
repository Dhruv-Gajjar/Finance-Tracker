import { Test, TestingModule } from '@nestjs/testing';
import { CustomCategoryController } from './custom-category.controller';
import { CustomCategoryService } from './custom-category.service';

describe('CustomCategoryController', () => {
  let controller: CustomCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomCategoryController],
      providers: [CustomCategoryService],
    }).compile();

    controller = module.get<CustomCategoryController>(CustomCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
