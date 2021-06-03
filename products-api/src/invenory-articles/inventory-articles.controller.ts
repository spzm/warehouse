import {Controller, Delete, Get, Param} from '@nestjs/common';
import {InventoryArticlesService} from "./inventory-articles.service";

@Controller('inventory-articles')
export class InventoryArticlesController {
    constructor(private readonly articlesService: InventoryArticlesService) {
    }

    @Get()
    getAllInventoryArticles() {
        return this.articlesService.getAllInventoryArticles();
    }

    @Get(':id')
    getInventoryByArticleId(@Param('id') id: string) {

    }

    // @Post()
    // async createInventoryArticles(@Body() post: CreateArticlesDto)

    // @Put(':id')
    // async

    @Delete(':id')
    async deletePost(@Param('id') id: string) {

    }
}
