import { Controller, Post, Body, UsePipes, ValidationPipe , Get , Query , Inject } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category/CreateCategory';
import { CategoryResponseDto } from '../dto/category/CategoryResponse';
import { ICategoryService } from 'src/IServices/ICategoryService';
import { Response } from 'src/responses/Response';

@Controller('categories')
export class CategoryController {
    constructor(
        @Inject('ICategoryService')
        private readonly categoryService: ICategoryService,
    ) {}
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async createCategory(@Body() dto: CreateCategoryDto): Promise<Response<CategoryResponseDto>> {
        return this.categoryService.createCategory(dto);
    }
    @Get()
    async getAllCategories(@Query('page') page?: number , @Query('limit') limit?: number ,  @Query("sort") sort?:string) {
        return this.categoryService.getAllCategories(page, limit ,sort);
    }
}


