import { Budget } from "src/entities/Budget";

export interface IBudgetRepo{
    save(budget: Budget): Promise<Budget>;
    findByCategoryId(catId: number): Promise<Budget | null>;
}