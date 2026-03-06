import { Budget } from "src/entities/Budget";
import { IBudgetService } from "src/IServices/IBudgetService";
import { Injectable , Inject  } from '@nestjs/common';
import { IBudgetRepo } from "src/IRepoInterface/IBudgetRepo";
import { Category } from "src/entities/Category";
import { TransactionType } from "src/enums/TransactionType";

@Injectable()
export class BudgetServices implements IBudgetService{
    constructor(
        @Inject('IBudgetRepo') private readonly budgetRepo: IBudgetRepo
    ) {}
    async updateBudgetAmount(categoryId: number, amount: number, type: TransactionType): Promise<Budget> {
        const budget = await this.budgetRepo.findByCategoryId(categoryId);
        if (!budget){
            throw new Error(`no budget found`);
        }
        if(type === TransactionType.INCOME){
            budget.limit = Number(budget.limit) + Number(amount);       
        }
        if(type === TransactionType.EXPENSE){
            budget.limit = Number(budget.limit) - Number(amount);       
        }
        return await this.budgetRepo.save(budget);
    }
    async createBudget(limit: number, period: number, category: Category): Promise<Budget> {
        const budget:Budget = new Budget();
        budget.limit = limit;
        budget.category = category;
        budget.period = period;
        const savedBudget = await this.budgetRepo.save(budget);
        return savedBudget;
    }
}