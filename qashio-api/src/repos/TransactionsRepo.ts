import { ITransactionsRepo } from "src/IRepoInterface/ITransactionsRepo";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactions } from "src/entities/Transaction";

@Injectable()
export class TransactionsRepo implements ITransactionsRepo{
    constructor(
        @InjectRepository(Transactions)
        private readonly repo: Repository<Transactions>,
    ) {}
    async findAllWithCount(
        skip = 0, 
        take = 10, 
    ): Promise<[Transactions[], number]> {
        const relations = ['category']; 
        return this.repo.findAndCount({ 
            skip, 
            take, 
            relations,
            order: { date: 'DESC' } 
        });
    }
}