import { Transaction } from "../entities/transaction"

export interface IReadTransactionsByUserIDResponse {
    transactions: Transaction[]
}
