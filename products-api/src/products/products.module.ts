import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductArticles } from './entities/product-articles.entity';
import { InventoryArticlesModule } from '../inventory-articles/inventory-articles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductArticles]),
    InventoryArticlesModule,
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
