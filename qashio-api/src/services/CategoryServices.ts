import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/Category';
import { CreateCategoryDto } from '../dto/category/CreateCategory';
import { CategoryResponseDto } from '../dto/category/CategoryResponse';
import { ICategoryService } from '../IServices/ICategoryService';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const category = this.categoryRepo.create({
      name: dto.name,
      budget: dto.budget ?? 500, 
    });

    // Save to the database
    const savedCategory = await this.categoryRepo.save(category);

    // Map to response DTO
    return {
      id: savedCategory.id,
      name: savedCategory.name,
      budget: savedCategory.budget,
      createdAt: savedCategory.createdAt,
    };
  }
}