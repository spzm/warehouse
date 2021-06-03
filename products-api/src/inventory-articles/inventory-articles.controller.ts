import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InventoryArticlesService } from './inventory-articles.service';
import { CreateArticlesDto } from './dto/create-articles-dto';

@Controller('inventory-articles')
export class InventoryArticlesController {
  constructor(
    private readonly inventoryArticlesService: InventoryArticlesService,
  ) {}

  @Get()
  getAllInventoryArticles() {
    return this.inventoryArticlesService.getAllInventoryArticles();
  }

  @Get(':id')
  getInventoryByArticleId(@Param('id') id: string) {
    return this.inventoryArticlesService.getInventoryArticleById(Number(id));
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async createInventoryArticles(@Body() inventoryArticle: CreateArticlesDto) {
    return this.inventoryArticlesService.createInventoryArticles(
      inventoryArticle,
    );
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.inventoryArticlesService.deleteInventoryArticles(Number(id));
  }
}
