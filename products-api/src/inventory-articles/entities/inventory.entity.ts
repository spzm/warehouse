import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { IsNumber, Min } from 'class-validator';

import { Article } from './article.entity';
import { Expose, Exclude, Transform, Type } from 'class-transformer';

@Entity()
export class Inventory {
  @PrimaryColumn({ type: 'int', nullable: false })
  art_id: number;

  @Expose()
  get name(): string {
    return this.article && this.article.name;
  }

  @OneToOne(() => Article, (article) => article.id, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'art_id' })
  @Exclude({ toPlainOnly: true })
  article: Article;

  @Column({ type: 'int' })
  @IsNumber()
  @Min(0, { always: true })
  stock: number;
}
