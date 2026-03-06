import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TransactionCreatedEvent } from 'src/events/TransactionCreatedEvent';
import { IBudgetService } from 'src/IServices/IBudgetService';
import { ICategoryService } from 'src/IServices/ICategoryService';

@Injectable()
export class BudgetListener {
    constructor(
        @Inject('IBudgetService') private readonly budgetService: IBudgetService,
        @Inject('ICategoryService') private readonly categoryService: ICategoryService,
    ) {}
@OnEvent('transaction.created')
async handleTransactionCreated(event: TransactionCreatedEvent) {
    try {
        const updatedBudget = await this.budgetService.updateBudgetAmount(
            event.categoryId, 
            event.amount,
            event.type
        );
    } catch (error) {
        
    }
}
}