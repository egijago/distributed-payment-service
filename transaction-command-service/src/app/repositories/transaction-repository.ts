import { Transaction } from "../../domain/entities/transaction"

export interface ITransactionRepository {
    create(transaction: Transaction): Promise<Transaction>
    update(transaction: Transaction): Promise<Transaction>
    delete(id: number): Promise<Transaction>
}
