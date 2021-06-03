import { Test, TestingModule } from '@nestjs/testing';
import { InventoryArticlesService } from '../inventory-articles.service';

describe('InventoryArticlesService', () => {
  let service: InventoryArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryArticlesService],
    }).compile();

    service = module.get<InventoryArticlesService>(InventoryArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
