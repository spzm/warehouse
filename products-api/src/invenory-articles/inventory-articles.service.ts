import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Inventory} from "./entities/inventory.entity";
import {Repository} from "typeorm";
import {CreateArticlesDto} from "./dto/create-articles-dto";

@Injectable()
export class InventoryArticlesService {
    constructor(
        @InjectRepository(Inventory) private inventoryEntity: Repository<Inventory>
    ) {
    }

    getAllInventoryArticles() {
        return this.inventoryEntity.find();
    }

    async createInventoryArticles(inventoryArticle: CreateArticlesDto) {

    }
}
