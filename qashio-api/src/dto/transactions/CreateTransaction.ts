import { IsInt, IsEnum, IsNumber, Min } from 'class-validator';
import { TransactionType } from 'src/enums/TransactionType';

export class CreateTransactionDto{
    @IsNumber({}, { message: 'amount must be a number' })
    @Min(1, { message: 'amount must be at least 1' })
    amount: number;

    @IsEnum(TransactionType, { message: 'type must be income or expense' })
    type: TransactionType;

    @IsInt({ message: 'please provide a valid category' })
    categoryId: number;
}
