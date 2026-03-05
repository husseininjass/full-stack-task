import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Transactions } from './Transaction';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('decimal', { default: 500 }) 
  budget: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Transactions, transaction => transaction.category)
  transactions: Transactions[];
}