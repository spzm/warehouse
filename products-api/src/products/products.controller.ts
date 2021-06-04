import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product-dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(Number(id));
  }

  @Post()
  createProducts(@Body() products: CreateProductDto) {
    return this.productsService.createProducts(products);
  }
}
