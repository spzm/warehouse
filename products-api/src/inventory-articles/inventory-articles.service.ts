import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Inventory} from "./entities/inventory.entity";
import {Repository} from "typeorm";
import {CreateArticlesDto} from "./dto/create-articles-dto";
import {classToClass, classToPlain, plainToClass} from "class-transformer";
import {Article} from "./entities/article.entity";

@Injectable()
export class InventoryArticlesService {
    constructor(
        @InjectRepository(Inventory) private inventory: Repository<Inventory>,
        @InjectRepository(Article) private articles: Repository<Article>,
    ) {
    }

    async getAllInventoryArticles() {
        const [articles, count] = await this.inventory.findAndCount({relations: ['article']});

        return {
            inventory: classToPlain(plainToClass(Inventory, articles)),
            count
        };
    }

    async getInventoryArticleById(id: number) {
        const inventoryArticle = await this.inventory.findOne(id, {relations: ['article']});

        if (!inventoryArticle) {
            throw new NotFoundException(`Inventory Article with id ${id} not found`);
        }

        return classToPlain(plainToClass(Inventory, inventoryArticle));
    }

    async createInventoryArticles(inventoryArticlesDto: CreateArticlesDto) {
        const inventoryArticlesList = inventoryArticlesDto.inventory;
        const articles = [];
        const inventoryArticles = [];

        for (const article of inventoryArticlesList) {
            articles.push(await this.articles.create(article));
            inventoryArticles.push(await this.inventory.create(article));
        }

        await this.articles.save(articles);
        await this.inventory.save(inventoryArticles);

        return inventoryArticlesList;
    }

    async deleteInventoryArticles(id: number) {
        const deleteResponse = await this.inventory.delete(id);
        console.log(deleteResponse);
        if (!deleteResponse.affected) {
            throw new NotFoundException(`Inventory Article with id ${id} not found`);
        }
    }
}
