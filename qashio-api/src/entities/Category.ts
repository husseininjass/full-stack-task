import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany , OneToOne , JoinColumn } from 'typeorm';
import { Transactions } from './Transaction';
import { Budget } from './Budget';

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
    
    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Transactions, transaction => transaction.category)
    transactions: Transactions[];
    
    @OneToOne(() => Budget, budget => budget.category, { cascade: true })
    @JoinColumn()
    budget: Budget;
}