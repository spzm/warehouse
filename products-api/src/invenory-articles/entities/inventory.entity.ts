import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import {IsNumber, Min} from "class-validator";

import {Articles} from "./articles.entity";

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number

    @OneToOne(() => Articles)
    @JoinColumn()
    article: Articles;

    @Column({ type: 'int' })
    @IsNumber()
    @Min(0, {always: true})
    stock: number;
}
