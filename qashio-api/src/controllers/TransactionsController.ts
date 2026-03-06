import { Controller, Post, Body, UsePipes, ValidationPipe , Get , Query , Inject , Param , ParseIntPipe , Delete , Put } from '@nestjs/common';
import { CreateTransactionDto } from 'src/dto/transactions/CreateTransaction';
import { TransactionResponse } from 'src/dto/transactions/TransactionResponse';
import { UpdateTransactionDto } from 'src/dto/transactions/UpdateTransaction';
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
    async getAllTransactions(@Query('page') page?: number , @Query('limit') limit?: number) {
        return this.transactionService.getAllTransactions(page, limit);
    }
    @Get(':id')
    async getOneTransaction(@Param('id', ParseIntPipe) id: number) {
        return this.transactionService.getOneTransaction(id);
    }
    @Delete(':id')
    async deleteTransaction(@Param('id', ParseIntPipe) id: number) {
        return this.transactionService.deleteTransaction(id);
    }
    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateTransaction(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTransactionDto
    ) {
        return this.transactionService.updateTransaction(id, dto);
    }
}