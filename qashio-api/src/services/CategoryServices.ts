import { Injectable , ConflictException , Inject  } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category/CreateCategory';
import { CategoryResponseDto } from '../dto/category/CategoryResponse';
import { ICategoryService } from '../IServices/ICategoryService';
import { ICategoryRepository } from 'src/IRepoInterface/ICategoryRepo';
import { Category } from 'src/entities/Category';
import { PaginatedResponseDto } from 'src/responses/PaginatedResponse';
import { Response } from 'src/responses/Response';
import { IBudgetService } from 'src/IServices/IBudgetService';

@Injectable()
export class CategoryService implements ICategoryService {
    constructor(
        @Inject('ICategoryRepository') private readonly categoryRepo: ICategoryRepository,
        @Inject('IBudgetService') private readonly budgetService: IBudgetService
    ) {}
    async findOneCategory(id: number): Promise<Category> {
        const categoryWithBudget = await this.categoryRepo.findByIdWithBudgets(id);   
        return categoryWithBudget;
    }

    async getAllCategories(page: number = 1,limit:number = 10 , sort = "DESC"): Promise<PaginatedResponseDto<CategoryResponseDto>> {
        const maxLimit = 20;
        const safeLimit = limit > maxLimit ? maxLimit : limit;
        const skip = (page - 1) * safeLimit;
        const sortOrder = (sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC') as 'ASC' | 'DESC';    
        const [categories, total] = await this.categoryRepo.findAllWithCount(skip, safeLimit ,sortOrder);
        const data = categories.map(cat => CategoryResponseDto.fromEntity(cat));
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
            const savedCategory = await this.categoryRepo.save(category);
            await this.budgetService.createBudget(dto.budget ?? 500 , dto.period ?? 1 , savedCategory);
            const categoryWithBudget = await this.categoryRepo.findByIdWithBudgets(savedCategory.id);
            return new Response(
                CategoryResponseDto.fromEntity(categoryWithBudget),
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