import { TransactionType } from "src/enums/TransactionType";

export class TransactionCreatedEvent {
  constructor(
        public readonly transactionId: number,
        public readonly amount: number,
        public readonly categoryId: number,
        public readonly type: TransactionType,
  ) {}
}