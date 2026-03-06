import { Category } from "src/entities/Category";
import { Transactions } from "src/entities/Transaction";
import { CategoryResponseDto } from "../category/CategoryResponse";

export class TransactionResponse{
    id: number;
    amount: number;
    date: Date;
    category: CategoryResponseDto;

    static fromEntity(transaction:Transactions) : TransactionResponse{
        const dto = new TransactionResponse();
        dto.id = transaction.id;
        dto.amount = transaction.amount;
        dto.date = transaction.date;
        dto.category = CategoryResponseDto.fromEntity(transaction.category);
        return dto;
    }
}