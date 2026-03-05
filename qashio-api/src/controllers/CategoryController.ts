import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category/CreateCategory';
import { CategoryResponseDto } from '../dto/category/CategoryResponse';
import { CategoryService } from 'src/services/CategoryServices';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async createCategory(@Body() dto: CreateCategoryDto): Promise<CategoryResponseDto> {
        return this.categoryService.createCategory(dto);
    }
}
