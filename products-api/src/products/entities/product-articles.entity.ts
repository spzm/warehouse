import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { IsNumber, Min } from 'class-validator';
import { Product } from './product.entity';
import { Article } from '../../inventory-articles/entities/article.entity';
import { Inventory } from '../../inventory-articles/entities/inventory.entity';

@Entity()
export class ProductArticles {
  @PrimaryColumn({ type: 'int' })
  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product_id: number;

  @PrimaryColumn({ type: 'int', unique: false })
  art_id: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.art_id)
  @JoinColumn({ name: 'art_id', referencedColumnName: 'art_id' })
  inventory: Inventory;

  @Column({ type: 'int' })
  @IsNumber()
  @Min(1, { always: true })
  amount_of: number;
}
