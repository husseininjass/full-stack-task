import { ITransactionsService } from "src/IServices/ITransactionsService";
import { Injectable, Inject } from '@nestjs/common';
import { ITransactionsRepo } from "src/IRepoInterface/ITransactionsRepo";
import { CreateTransactionDto } from "src/dto/transactions/CreateTransaction";
import { TransactionResponse } from "src/dto/transactions/TransactionResponse";
import { Response } from "src/responses/Response";
import { ICategoryService } from "src/IServices/ICategoryService";
import { IBudgetService } from "src/IServices/IBudgetService";
import { DataSource } from 'typeorm';
import { Transactions } from "src/entities/Transaction";
import { TransactionCreatedEvent } from "src/events/TransactionCreatedEvent";
import { EventEmitter2 } from '@nestjs/event-emitter'; // Import this!
import { TransactionType } from "src/enums/TransactionType";
import { PaginatedResponseDto } from "src/responses/PaginatedResponse";
@Injectable()
export class TransactionsServices implements ITransactionsService {
    constructor(
        @Inject('ITransactionsRepo') private readonly transactionRepo: ITransactionsRepo,
        @Inject('ICategoryService') private readonly categoryService: ICategoryService,
        @Inject('IBudgetService') private readonly budgetService: IBudgetService,
        private readonly dataSource: DataSource,
        private readonly eventEmitter: EventEmitter2 
    ) {}
    async getAllTransactions(page: number = 1, limit: number = 10): Promise<PaginatedResponseDto<TransactionResponse>> {
        const maxLimit = 20;
        const safeLimit = Math.min(limit || 10, maxLimit);
        const safePage = Math.max(page || 1, 1);
        const skip = (safePage - 1) * safeLimit;
        const [transactions, total] = await this.transactionRepo.findAllWithCount(skip, safeLimit);
        const data = transactions.map(trx => TransactionResponse.fromEntity(trx));
        return new PaginatedResponseDto(data, total, safePage, safeLimit);
    }

    async createTransaction(dto: CreateTransactionDto): Promise<Response<TransactionResponse>> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const categoryEntity = await this.categoryService.findOneCategory(dto.categoryId);
            if (!categoryEntity) throw new Error('Invalid category');
            if (dto.type === TransactionType.EXPENSE && dto.amount > categoryEntity.budget.limit) {
                throw new Error('transaction exceeds the category budget');
            }
            const transaction = queryRunner.manager.create(Transactions, {
                amount: dto.amount,
                type: dto.type,
                category: categoryEntity
            });
            const savedTransaction = await queryRunner.manager.save(Transactions, transaction);
            await queryRunner.commitTransaction();
            this.eventEmitter.emit(
                'transaction.created', 
                new TransactionCreatedEvent(
                    savedTransaction.id,
                    dto.amount,
                    dto.categoryId,
                    dto.type
                )
            );
            return new Response(
                TransactionResponse.fromEntity(savedTransaction),
                'transaction created successfully',
                true
            );
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return new Response(
                new TransactionResponse(),
                error?.message || 'failed to create transaction',
                false
            );
        } finally {
            await queryRunner.release();
        }
    }
}