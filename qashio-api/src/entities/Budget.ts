import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from 'typeorm';
import { Transactions } from './Transaction';
import { Category } from './Category';

@Entity("budgets")
export class Budget {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal' , { default: 500 })
    limit: number;

    @Column({ default: 1 })
    period: number;

    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(() => Category, category => category.budget)
    category: Category;
}