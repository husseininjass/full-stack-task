import { Category } from 'src/entities/Category';

export interface ICategoryRepository {
    findAll(skip?: number, take?: number): Promise<Category[]>;
    findByName(name: string): Promise<Category | null>;
    save(category: Category): Promise<Category>;
    count(): Promise<number>;
    findAllWithCount(skip?: number, take?: number ,sort?:string): Promise<[Category[], number]>;
    findByIdWithBudgets(id: number): Promise<Category>;

}

