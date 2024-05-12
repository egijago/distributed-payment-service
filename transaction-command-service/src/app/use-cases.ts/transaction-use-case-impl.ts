import { ICreateTransactionRequest, ICreateTransactionResponse, IDeleteTransactionRequest, IDeleteTransactionResponse, IUpdateTransactionRequest, IUpdateTransactionResponse } from "../../domain/dtos"
import { IMQRepository } from "../repositories/mq-repository"
import { ITransactionRepository } from "../repositories/transaction-repository"
import { TransactionUseCase } from "./transaction-use-case"


export class TransactionUseCaseImpl implements TransactionUseCase {
    constructor(private transactionRepository: ITransactionRepository, private mqRepository: IMQRepository) {
        mqRepository.consume("transaction", async (key: any, value: any) => {
            console.log("📨 Receive message: ", value, key)
            value = JSON.parse(value)
            if (value.type == "create") {
                try {
                    const response = await this.createTransaction(value.data)                
                    const event = {
                        type: "create-response", 
                        data: response, 
                        success: true
                    }
                    const messages = [{ value: JSON.stringify(event) }];
                    mqRepository.produce("transaction", messages)
                } catch (error: any) {
                    const event = {
                        type: "create-response", 
                        data: value.data,
                        success: false,
                        message: error.message  
                    }
                    const messages = [{ value: JSON.stringify(event) }];
                    mqRepository.produce("transaction", messages)
                }
            }

            if (value.type == "update") {
                try {
                    const response = await this.updateTransaction(value.data)
                    const event = {
                        type: "update-response", 
                        data: response,
                        success: true
                    }
                    const messages = [{ value: JSON.stringify(event) }];
                    mqRepository.produce("transaction", messages)
                } catch (error: any) {
                    const event = {
                        type: "update-response", 
                        data: value.data,
                        success: false,
                        message: error.message
                    }
                    const messages = [{ value: JSON.stringify(event) }];
                    mqRepository.produce("transaction", messages)
                }
            }

            if (value.type == "delete") {
                try {
                    const response = await this.deleteTransaction(value.data)
                    const event = {
                        type: "delete-response", 
                        data: response,
                        success: true
                    }
                    const messages = [{ value: JSON.stringify(event) }];
                    mqRepository.produce("transaction", messages)
                } catch (error: any) { 
                    const event = {
                        type: "delete-response", 
                        data: value.data,
                        success: false,
                        message: error.message
                    }
                    const messages = [{ value: JSON.stringify(event) }];
                    mqRepository.produce("transaction", messages)
                }
            }
        })
    }

    async createTransaction(
        request: ICreateTransactionRequest,
    ): Promise<ICreateTransactionResponse> {
        const transaction = await this.transactionRepository.create({
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
        const transaction = await this.transactionRepository.update({
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
        const transaction = await this.transactionRepository.delete(request.id)
        return { transaction }
    }
}
