import { Test, TestingModule } from '@nestjs/testing';
import { InventoryArticlesController } from '../inventory-articles.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../entities/article.entity';
import { Inventory } from '../entities/inventory.entity';
import { Repository } from 'typeorm';
import { InventoryArticlesService } from '../inventory-articles.service';

describe('ArticlesController', () => {
  let controller: InventoryArticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryArticlesController],
      providers: [
        InventoryArticlesService,
        {
          provide: getRepositoryToken(Article),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Inventory),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<InventoryArticlesController>(
      InventoryArticlesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
