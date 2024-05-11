import { ICreateTransactionRequest, ICreateTransactionResponse, IDeleteTransactionRequest, IDeleteTransactionResponse, IUpdateTransactionRequest, IUpdateTransactionResponse } from "../../domain/dtos"
import { ITransactionRepository } from "../repositories/transaction-repository"
import { TransactionUseCase } from "./transaction-use-case"


export class TransactionUseCaseImpl implements TransactionUseCase {
    constructor(private repository: ITransactionRepository) {}

    async createTransaction(
        request: ICreateTransactionRequest,
    ): Promise<ICreateTransactionResponse> {
        const transaction = await this.repository.create({
            id: request.id.toString(),
            amount: request.amount,
            source_init_bal: request.source_init_bal,
            dest_init_bal: request.dest_init_bal,
            source_user_id: request.source_user_id,
            dest_user_id: request.dest_user_id,
        })

        return { transaction }
    }

    async updateTransaction(
        request: IUpdateTransactionRequest,
    ): Promise<IUpdateTransactionResponse> {
        const transaction = await this.repository.update({
            id: request.id.toString(),
            amount: request.amount,
            source_init_bal: request.source_init_bal,
            dest_init_bal: request.dest_init_bal,
            source_user_id: request.source_user_id,
            dest_user_id: request.dest_user_id,
        })

        return { transaction }
    }

    async deleteTransaction(request: IDeleteTransactionRequest): Promise<IDeleteTransactionResponse> {
        const transaction = await this.repository.delete(request.id)
        return { transaction }
    }
}
