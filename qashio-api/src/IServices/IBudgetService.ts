import { Budget } from "src/entities/Budget";
import { Category } from "src/entities/Category";
import { TransactionType } from "src/enums/TransactionType";

export interface IBudgetService{
    createBudget(limit:number , period:number , category:Category): Promise<Budget>
    updateBudgetAmount(categoryId: number, amount: number , type: TransactionType): Promise<Budget>;
}