import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductArticles } from './entities/product-articles.entity';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { classToPlain, plainToClass } from 'class-transformer';
import { GetProductDto } from './dto/get-product-dto';
import { CreateProductDto } from './dto/create-product-dto';
import { InventoryArticlesService } from '../inventory-articles/inventory-articles.service';
import { SellAmountDto } from './dto/sell-amount-dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductArticles)
    private productArticles: Repository<ProductArticles>,
    @InjectRepository(Product) private product: Repository<Product>,
    private inventoryArticlesService: InventoryArticlesService,
  ) {}

  async getAllProducts() {
    const products = await this.product
      .createQueryBuilder('product')
      .leftJoin('product.contain_articles', 'contain_articles')
      .leftJoin('contain_articles.inventory', 'inventory')
      .select([
        'product.name',
        'contain_articles.art_id',
        'contain_articles.amount_of',
        'inventory.stock',
      ])
      .getMany();

    return {
      products: classToPlain(plainToClass(GetProductDto, products)),
      count: products.length,
    };
  }

  async getProductById(id: number) {
    const product = await this.product
      .createQueryBuilder('product')
      .where('product.id=:id', { id })
      .leftJoin('product.contain_articles', 'contain_articles')
      .leftJoin('contain_articles.inventory', 'inventory')
      .select([
        'product.name',
        'contain_articles.art_id',
        'contain_articles.amount_of',
        'inventory.stock',
      ])
      .getOne();

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return plainToClass(GetProductDto, product);
  }

  async createProducts(productsDto: CreateProductDto) {
    const productsItems = productsDto.products;

    for (const product of productsItems) {
      const result = await this.product.save(product);
      for (const containArticles of product.contain_articles) {
        await this.productArticles.save({
          ...containArticles,
          product_id: result.id,
        });
      }
    }

    return productsItems;
  }

  async sellProduct(id: number, sellAmount: SellAmountDto) {
    const productEntity = await this.getProductById(id);
    console.log(productEntity);

    if (!productEntity) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const product = plainToClass(GetProductDto, productEntity);

    const amount = sellAmount.amount;

    if (product.available_stock < amount) {
      throw new NotFoundException(
        `Available Stock ${product.available_stock} less than amount ${amount}.`,
      );
    }

    for (const inventory of product.contain_articles) {
      const { art_id, amount_of } = inventory;
      await this.inventoryArticlesService.sellInventoryArticle(
        art_id,
        amount_of * amount,
      );
    }
  }
}
