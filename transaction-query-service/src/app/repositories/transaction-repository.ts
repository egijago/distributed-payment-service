import { Transaction } from "../../domain/entities/transaction"

export interface ITransactionRepository {
    read(id: string): Promise<Transaction>
    read_by_user_id(user_id: number): Promise<Transaction[]>
}
