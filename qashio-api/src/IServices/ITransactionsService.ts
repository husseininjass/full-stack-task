import { CreateTransactionDto } from "src/dto/transactions/CreateTransaction";
import { TransactionResponse } from "src/dto/transactions/TransactionResponse";
import { PaginatedResponseDto } from "src/responses/PaginatedResponse";
import { Response } from "src/responses/Response";

export interface ITransactionsService{
    createTransaction(dto:CreateTransactionDto) : Promise<Response<TransactionResponse>>;
    getAllTransactions(page?:number , limit?:number):Promise<PaginatedResponseDto<TransactionResponse>>;
}