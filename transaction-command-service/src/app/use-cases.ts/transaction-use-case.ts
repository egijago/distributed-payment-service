import { ICreateTransactionRequest, ICreateTransactionResponse, IDeleteTransactionRequest, IDeleteTransactionResponse, IUpdateTransactionRequest, IUpdateTransactionResponse } from "../../domain/dtos"
export interface TransactionUseCase {
    createTransaction(request: ICreateTransactionRequest): Promise<ICreateTransactionResponse>
    updateTransaction(request: IUpdateTransactionRequest): Promise<IUpdateTransactionResponse>
    deleteTransaction(request: IDeleteTransactionRequest): Promise<IDeleteTransactionResponse>
}
