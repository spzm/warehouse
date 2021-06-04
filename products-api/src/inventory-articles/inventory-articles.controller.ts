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
import {classToPlain} from "class-transformer";

@Controller('inventory-articles')
export class InventoryArticlesController {
  constructor(
    private readonly inventoryArticlesService: InventoryArticlesService,
  ) {}

  @Get()
  getAllInventoryArticles() {
    const inventoryArticles = this.inventoryArticlesService.getAllInventoryArticles();

    return classToPlain(inventoryArticles);
  }

  @Get(':id')
  getInventoryByArticleId(@Param('id') id: string) {
    const inventoryArticle = this.inventoryArticlesService.getInventoryArticleById(Number(id));

    return classToPlain(inventoryArticle);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  createInventoryArticles(@Body() inventoryArticle: CreateArticlesDto) {
    return this.inventoryArticlesService.createInventoryArticles(
      inventoryArticle,
    );
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.inventoryArticlesService.deleteInventoryArticles(Number(id));
  }
}
