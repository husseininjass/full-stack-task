import { CreateTransactionDto } from "src/dto/transactions/CreateTransaction";
import { TransactionResponse } from "src/dto/transactions/TransactionResponse";
import { UpdateTransactionDto } from "src/dto/transactions/UpdateTransaction";
import { PaginatedResponseDto } from "src/responses/PaginatedResponse";
import { Response } from "src/responses/Response";

export interface ITransactionsService{
    createTransaction(dto:CreateTransactionDto) : Promise<Response<TransactionResponse>>;
    getAllTransactions(page?:number , limit?:number):Promise<PaginatedResponseDto<TransactionResponse>>;
    getOneTransaction(id:number): Promise<Response<TransactionResponse>>;
    deleteTransaction(id:number): Promise<Response<boolean>>;
    updateTransaction(id:number , dto: UpdateTransactionDto) : Promise<Response<TransactionResponse>>;
}