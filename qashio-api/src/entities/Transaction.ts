import { TransactionType } from 'src/enums/TransactionType';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './Category';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  amount: number;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  date: Date;

  @ManyToOne(() => Category, category => category.transactions)
  category: Category;
}