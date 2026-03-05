import { Category } from "src/entities/Category";

export class CategoryResponseDto {
    id: number;
    name: string;
    createdAt: Date;
    budget: number;

    static fromEntity(category: Category): CategoryResponseDto {
        const dto = new CategoryResponseDto();
        dto.id = category.id;
        dto.name = category.name;
        dto.createdAt = category.createdAt;
        dto.budget = category.budget;
        return dto;
    }
}