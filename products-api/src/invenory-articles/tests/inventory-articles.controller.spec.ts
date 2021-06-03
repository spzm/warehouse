import { Test, TestingModule } from '@nestjs/testing';
import { InventoryArticlesController } from '../inventory-articles.controller';

describe('ArticlesController', () => {
  let controller: InventoryArticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryArticlesController],
    }).compile();

    controller = module.get<InventoryArticlesController>(InventoryArticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
