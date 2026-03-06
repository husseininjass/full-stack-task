import { Controller, Post, Body, UsePipes, ValidationPipe , Get , Query , Inject } from '@nestjs/common';
import { CreateTransactionDto } from 'src/dto/transactions/CreateTransaction';
import { TransactionResponse } from 'src/dto/transactions/TransactionResponse';
import { ITransactionsService } from 'src/IServices/ITransactionsService';
import { Response } from 'src/responses/Response';

@Controller('transactions')
export class TransactionsController {
    constructor(
        @Inject('ITransactionsService')
        private readonly transactionService: ITransactionsService,
    ) {}
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async createTransaction(@Body() dto: CreateTransactionDto): Promise<Response<TransactionResponse>> {
        return this.transactionService.createTransaction(dto);
    }
    @Get()
    async getAllCategories(@Query('page') page?: number , @Query('limit') limit?: number) {
        return this.transactionService.getAllTransactions(page, limit);
    }
}