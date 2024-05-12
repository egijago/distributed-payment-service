import { IReadTransactionResponse, IReadTransactionsByUserIDRequest } from "../../domain/dtos"
import { IReadTransactionRequest } from "../../domain/dtos/read-transaction-request"
import { IReadTransactionsByUserIDResponse } from "../../domain/dtos/read-transactions-by-user-id-response"
import { ITransactionRepository } from "../repositories/transaction-repository"
import { TransactionUseCase } from "./transaction-use-case"


export class TransactionUseCaseImpl implements TransactionUseCase {
    constructor(private repository: ITransactionRepository) {}
    async readTransaction(request: IReadTransactionRequest): Promise<IReadTransactionResponse> {
        const transaction = await this.repository.read(request.id.toString())

        return { transaction }
    }
    async readTransactionsByUserID(request: IReadTransactionsByUserIDRequest): Promise<IReadTransactionsByUserIDResponse> {
        const transactions = await this.repository.read_by_user_id(request.user_id)

        return { transactions }
    }
}
