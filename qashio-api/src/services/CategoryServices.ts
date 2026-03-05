import { Injectable , ConflictException , Inject  } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category/CreateCategory';
import { CategoryResponseDto } from '../dto/category/CategoryResponse';
import { ICategoryService } from '../IServices/ICategoryService';
import { ICategoryRepository } from 'src/IRepoInterface/ICategoryRepo';
import { Category } from 'src/entities/Category';
import { PaginatedResponseDto } from 'src/responses/PaginatedResponse';
import { Response } from 'src/responses/Response';

@Injectable()
export class CategoryService implements ICategoryService {
    constructor(@Inject('ICategoryRepository') private readonly categoryRepo: ICategoryRepository) {}

    async getAllCategories(page = 1,limit = 10): Promise<PaginatedResponseDto<CategoryResponseDto>> {
        const maxLimit = 20;
        const safeLimit = limit > maxLimit ? maxLimit : limit;
        const skip = (page - 1) * safeLimit;
        const [categories, total] = await this.categoryRepo.findAllWithCount(skip, safeLimit);
        const data = categories.map(CategoryResponseDto.fromEntity);
        return new PaginatedResponseDto(data, total, page, safeLimit);
    }

    async createCategory(dto: CreateCategoryDto): Promise<Response<CategoryResponseDto>> {
        try {
            const existingCategory = await this.categoryRepo.findByName(dto.name);
            if (existingCategory) {
                throw new ConflictException('Category already exists');
            }
            const category = new Category();
            category.name = dto.name;
            category.budget = dto.budget ?? 500;
            const savedCategory = await this.categoryRepo.save(category);
            return new Response(
                CategoryResponseDto.fromEntity(savedCategory),
                "a new category has been created successfully",
                true
            );
        } catch (error) {
            return new Response(
                new CategoryResponseDto(),
                error?.message || 'failed to create category',
                false
            );
        }
    }
}