import { IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { TransactionType } from 'src/enums/TransactionType';

export class UpdateTransactionDto {
    @IsOptional()
    @IsNumber({}, { message: 'amount must be a number' })
    @Min(1, { message: 'amount must be at least 1' })
    amount?: number;

    @IsOptional()
    @IsEnum(TransactionType)
    type?: TransactionType;

    @IsOptional()
    @IsNumber({}, { message: 'provide valid category' })
    categoryId?: number;
}