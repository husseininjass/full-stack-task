import { Transactions } from "src/entities/Transaction";

export interface ITransactionsRepo{
    findAllWithCount(skip?: number, take?: number): Promise<[Transactions[], number]>;
}