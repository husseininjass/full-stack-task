import { Transactions } from "src/entities/Transaction";

export interface ITransactionsRepo{
    findAllWithCount(skip?: number, take?: number): Promise<[Transactions[], number]>;
    findById(id:number): Promise<Transactions | null>;
    delete(id:number): Promise<Transactions | null>;
    save(transaction: Transactions) : Promise<Transactions>;
}