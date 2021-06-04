import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDefined, IsString, MinLength } from 'class-validator';
import { ProductArticles } from './product-articles.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @IsDefined({ always: true })
  @IsString({ always: true })
  @MinLength(2, { always: true })
  name: string;

  @OneToMany(
    () => ProductArticles,
    (productArticles) => productArticles.product_id,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'product_id' })
  contain_articles: ProductArticles[];
}
