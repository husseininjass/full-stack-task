import { Category } from "src/entities/Category";
import { Budget } from "src/entities/Budget";
import { Transactions } from "src/entities/Transaction";

export class CategoryResponseDto {
    id: number;
    name: string;
    createdAt: Date;
    budget: Budget;
    transactions?: Transactions[];

    static fromEntity(category: Category): CategoryResponseDto {
        const dto = new CategoryResponseDto();
        dto.id = category.id;
        dto.name = category.name;
        dto.createdAt = category.createdAt;
        dto.budget = category.budget;
        return dto;
    }
}