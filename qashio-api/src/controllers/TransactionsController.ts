import { Controller, Post, Body, UsePipes, ValidationPipe , Get , Query , Inject } from '@nestjs/common';
import { ITransactionsService } from 'src/IServices/ITransactionsService';
import { Response } from 'src/responses/Response';

@Controller('transactions')
export class TransactionsController {
    constructor(
        @Inject('ITransactionsService')
        private readonly transactionService: ITransactionsService,
    ) {}
}