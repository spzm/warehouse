import {Entity, Column, PrimaryColumn} from 'typeorm';
import {IsDefined, IsString, MinLength} from "class-validator";

@Entity()
export class Article {
    @PrimaryColumn({type: 'int'})
    id: number;

    @Column({type: 'varchar', length: 100})
    @IsDefined({always: true})
    @IsString({always: true})
    @MinLength(2, {always: true})
    name: string;
}
