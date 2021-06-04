import { Exclude, Expose, Type } from 'class-transformer';

export class InventoryDto {
  @Exclude({ toPlainOnly: true })
  @Type(() => Number)
  stock: number;
}

export class ContainArticlesDto {
  @Type(() => Number)
  art_id: number;

  @Type(() => Number)
  amount_of: number;

  @Type(() => InventoryDto)
  @Exclude({ toPlainOnly: true })
  inventory: InventoryDto;

  @Expose()
  get stock(): number {
    return this.inventory.stock;
  }
}

export class GetProductDto {
  @Type(() => String)
  name: string;

  @Type(() => ContainArticlesDto)
  contain_articles: ContainArticlesDto[];

  @Expose()
  get available_stock(): number {
    const stocksPerArticle = this.contain_articles.map((item) => {
      return Math.floor(item.inventory.stock / item.amount_of);
    });

    if (stocksPerArticle.length === 0) return 0;

    const stock = Math.min(...stocksPerArticle);

    return Number.isFinite(stock) && !Number.isNaN(stock) ? stock : 0;
  }
}
