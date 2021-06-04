import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductArticles } from './entities/product-articles.entity';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { classToPlain, plainToClass } from 'class-transformer';
import { GetProductDto } from './dto/get-product-dto';
import { CreateProductDto } from './dto/create-product-dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductArticles)
    private productArticles: Repository<ProductArticles>,
    @InjectRepository(Product) private product: Repository<Product>,
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

  async getProduct(id: number) {
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

    return classToPlain(plainToClass(GetProductDto, product));
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
}
