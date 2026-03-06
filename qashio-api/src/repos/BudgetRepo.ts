import { Budget } from "src/entities/Budget";
import { IBudgetRepo } from "src/IRepoInterface/IBudgetRepo";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BudgetRepo implements IBudgetRepo{
    constructor(
        @InjectRepository(Budget)
        private readonly repo: Repository<Budget>,
    ) {}
    async findByCategoryId(catId: number): Promise<Budget | null> {
        return await this.repo.findOne({
            where: {
                category: { id: catId }
            }
        });
    }
    async save(budget: Budget): Promise<Budget> {
        return this.repo.save(budget);
    }
}