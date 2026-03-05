import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/Category';
import { ICategoryRepository } from 'src/IRepoInterface/ICategoryRepo';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
    constructor(
        @InjectRepository(Category)
        private readonly repo: Repository<Category>,
    ) {}

    async count(): Promise<number> {
        return this.repo.count();
    }

    async findAll(skip = 0, take = 10): Promise<Category[]> {
        return this.repo.find({ skip, take });
    }

    async findByName(name: string): Promise<Category | null> {
        return this.repo.findOne({ where: { name } });
    }

    async save(category: Category): Promise<Category> {
        return this.repo.save(category);
    }

    async findAllWithCount(skip = 0, take = 10): Promise<[Category[], number]> {
        return this.repo.findAndCount({ skip, take });
    }
}