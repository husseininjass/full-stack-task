import { CategoryResponseDto } from "src/dto/category/CategoryResponse";
import { CreateCategoryDto } from "src/dto/category/CreateCategory";
import { PaginatedResponseDto } from "src/responses/PaginatedResponse";
import { Response } from 'src/responses/Response';

export  interface ICategoryService{
    createCategory(dto:CreateCategoryDto) : Promise<Response<CategoryResponseDto>>;
    getAllCategories(page?:number , limit?:number):Promise<PaginatedResponseDto<CategoryResponseDto>>;
    findOneCategory(id : number) : Promise<CategoryResponseDto>;
}