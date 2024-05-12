import { PrismaClient } from "@prisma/client"
import { Transaction } from "../../domain/entities/transaction"
import { ITransactionRepository } from "./transaction-repository"

export class TransactionRepositoryImpl implements ITransactionRepository {
    
    constructor(private prisma: PrismaClient) {}
    async read(id: string): Promise<Transaction> {
        const transaction = await this.prisma.transaction.findUnique({
            where: {
                id: id
            }
        })

        if (!transaction) throw new Error("Transaction not found")

        return {
            id: transaction.id,
            amount: Number(transaction.amount),
            source_init_bal: Number(transaction.source_init_bal),
            dest_init_bal: Number(transaction.dest_init_bal),
            source_user_id: transaction.source_user_id,
            dest_user_id: transaction.dest_user_id,
        
        }
    }
    async read_by_user_id(user_id: number): Promise<Transaction[]> {
        const transactions = await this.prisma.transaction.findMany({
            where: {
                OR: [
                    {
                        source_user_id: user_id
                    },
                    {
                        dest_user_id: user_id
                    }
                ]
            }
        })

        return transactions.map(transaction => {
            return {
                id: transaction.id,
                amount: Number(transaction.amount),
                source_init_bal: Number(transaction.source_init_bal),
                dest_init_bal: Number(transaction.dest_init_bal),
                source_user_id: transaction.source_user_id,
                dest_user_id: transaction.dest_user_id,
            
            }
        })
    }
    
}
