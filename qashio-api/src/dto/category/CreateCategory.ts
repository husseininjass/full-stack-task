import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'please provide a valid category name' })
  name: string;

  @IsOptional()
  @IsNumber({}, { message: 'budget must be a number' })
  @Min(0, { message: 'budget must be at least 0' })
  budget?: number;
}