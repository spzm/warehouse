import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {IsDefined, IsString, MinLength} from "class-validator";

@Entity()
export class Articles {
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column({type: 'varchar', length: 300})
    @IsDefined({always: true})
    @IsString({always: true})
    @MinLength(2, {always: true})
    name: string;
}
