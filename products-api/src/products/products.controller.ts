import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product-dto';
import { SellAmountDto } from './dto/sell-amount-dto';
import { classToPlain } from 'class-transformer';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    const product = this.productsService.getProductById(Number(id));

    return classToPlain(product);
  }

  @Post()
  createProducts(@Body() products: CreateProductDto) {
    return this.productsService.createProducts(products);
  }

  @Post(':id/sell')
  sellProduct(@Param('id') id: string, @Body() sellAmount: SellAmountDto) {
    return this.productsService.sellProduct(Number(id), sellAmount);
  }
}
