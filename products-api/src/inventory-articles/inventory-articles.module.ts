import { Module } from '@nestjs/common';
import { InventoryArticlesController } from './inventory-articles.controller';
import { InventoryArticlesService } from './inventory-articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Inventory } from './entities/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Inventory])],
  exports: [InventoryArticlesService],
  controllers: [InventoryArticlesController],
  providers: [InventoryArticlesService],
})
export class InventoryArticlesModule {}
