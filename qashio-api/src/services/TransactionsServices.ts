import { ITransactionsService } from "src/IServices/ITransactionsService";
import { Injectable , ConflictException , Inject  } from '@nestjs/common';
import { ITransactionsRepo } from "src/IRepoInterface/ITransactionsRepo";

@Injectable()
export class TransactionsServices implements ITransactionsService{
    constructor(@Inject('ITransactionsRepo') private readonly transactionRepo: ITransactionsRepo) {}
    
}