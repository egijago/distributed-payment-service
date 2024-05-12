import { IReadTransactionResponse, IReadTransactionsByUserIDRequest } from "../../domain/dtos"
import { IReadTransactionRequest } from "../../domain/dtos/read-transaction-request"
import { IReadTransactionsByUserIDResponse } from "../../domain/dtos/read-transactions-by-user-id-response"
export interface TransactionUseCase {
    readTransaction(request: IReadTransactionRequest): Promise<IReadTransactionResponse>
    readTransactionsByUserID(request: IReadTransactionsByUserIDRequest): Promise<IReadTransactionsByUserIDResponse>
}
