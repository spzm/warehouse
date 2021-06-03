import {IsNotEmpty, IsNumber, IsString, Min, MinLength, ValidateNested} from "class-validator";
import {Expose, Type} from "class-transformer";

export class CreateArticleDto {
    @Type(() => Number)
    @Min(0, {always: true})
    art_id: number;

    @Type(() => Number)
    @Min(0, {always: true})
    @Expose()
    get id(): number {
        return this.art_id;
    }

    @IsString()
    @IsNotEmpty()
    @MinLength(2, {always: true})
    name: string;

    @Type(() => Number)
    @Min(0, {always: true})
    stock: number;
}

export class CreateArticlesDto {
    @Type(() => CreateArticleDto)
    @ValidateNested({each: true})
    inventory: CreateArticleDto[]
}
