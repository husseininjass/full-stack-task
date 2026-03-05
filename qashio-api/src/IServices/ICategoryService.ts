import { CategoryResponse } from "src/dto/category/CategoryResponse";
import { CreateCategory } from "src/dto/category/CreateCategory";

export  interface ICategoryService{
    createCategory(dto:CreateCategory) : Promise<CategoryResponse>;
}