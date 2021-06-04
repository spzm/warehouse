import {
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class CreateContainArticleDto {
  @Type(() => Number)
  @Min(0, { always: true })
  art_id: number;

  @Type(() => Number)
  @Min(0, { always: true })
  amount_of: number;
}

export class CreateArticlesDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { always: true })
  name: string;

  @Type(() => CreateContainArticleDto)
  @ValidateNested({ each: true })
  contain_articles: CreateContainArticleDto[];
}

export class CreateProductDto {
  @Type(() => CreateArticlesDto)
  @ValidateNested({ each: true })
  products: CreateArticlesDto[];
}
