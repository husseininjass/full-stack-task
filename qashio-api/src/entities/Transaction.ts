import { TransactionType } from 'src/enums/TransactionType';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne , CreateDateColumn } from 'typeorm';
import { Category } from './Category';

@Entity("transactions")
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  amount: number;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

    @CreateDateColumn()
    createdAt: Date;

  @ManyToOne(() => Category, category => category.transactions)
  category: Category;
}