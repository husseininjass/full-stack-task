import { CreateTransactionDto } from "src/dto/transactions/CreateTransaction";
import { TransactionResponse } from "src/dto/transactions/TransactionResponse";
import { Response } from "src/responses/Response";

export interface ITransactionsService{
    createTransaction(dto:CreateTransactionDto) : Promise<Response<TransactionResponse>>
}