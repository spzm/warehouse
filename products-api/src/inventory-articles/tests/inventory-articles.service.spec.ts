import { Test, TestingModule } from '@nestjs/testing';
import { InventoryArticlesService } from '../inventory-articles.service';
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {Article} from "../entities/article.entity";
import {Inventory} from "../entities/inventory.entity";
import {Repository} from "typeorm";

describe('InventoryArticlesService', () => {
  let service: InventoryArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryArticlesService, {
        provide: getRepositoryToken(Article),
        useClass: Repository
      }, {
        provide: getRepositoryToken(Inventory),
        useClass: Repository
      }],
    }).compile();

    service = module.get<InventoryArticlesService>(InventoryArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
