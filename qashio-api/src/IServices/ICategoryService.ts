import { CategoryResponseDto } from "src/dto/category/CategoryResponse";
import { CreateCategoryDto } from "src/dto/category/CreateCategory";

export  interface ICategoryService{
    createCategory(dto:CreateCategoryDto) : Promise<CategoryResponseDto>;
}