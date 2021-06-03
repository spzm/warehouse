import {IsNotEmpty, IsNumber, IsString, Min, MinLength, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    art_id: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2, {always: true})
    name: string;

    @IsNumber()
    @Min(0, {always: true})
    stock: string;
}

export class CreateArticlesDto {
    @Type(() => CreateArticleDto)
    @ValidateNested({each: true})
    articles: CreateArticleDto[]
}
