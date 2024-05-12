import { PrismaClient } from "@prisma/client"
import { Transaction } from "../../domain/entities/transaction"
import { ITransactionRepository } from "./transaction-repository"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export class TransactionRepositoryImpl implements ITransactionRepository {
    constructor(private prisma: PrismaClient) {}
    async create(transaction: Transaction): Promise<Transaction> {
        try {
            const _transaction = await this.prisma.transaction.create({
                data: {
                    id: transaction.id.toString(),
                    amount: transaction.amount,
                    source_init_bal: transaction.source_init_bal,
                    dest_init_bal: transaction.dest_init_bal,
                    source_user_id: transaction.source_user_id,
                    dest_user_id: transaction.dest_user_id,
                }
            })
            return {
                id: _transaction.id,
                amount: Number(_transaction.amount),
                source_init_bal: Number(_transaction.source_init_bal),
                dest_init_bal: Number(_transaction.dest_init_bal),
                source_user_id: _transaction.source_user_id,
                dest_user_id: _transaction.dest_user_id,
            }
        } catch (error: any) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {    
                return {
                    id: String(),
                    amount: Number(),
                    source_init_bal: Number(),
                    dest_init_bal: Number(),
                    source_user_id: Number(),
                    dest_user_id: Number(),
                }
            }
            throw new Error(error)
        }
    }
    async update(transaction: Transaction): Promise<Transaction> {
        const _transaction = await this.prisma.transaction.update({
            data: {
                amount: transaction.amount,
                source_init_bal: transaction.source_init_bal,
                dest_init_bal: transaction.dest_init_bal,
                source_user_id: transaction.source_user_id,
                dest_user_id: transaction.dest_user_id,
            },
            where: {
                id: transaction.id.toString()
            }
        })
        return {
            id: _transaction.id,
            amount: Number(_transaction.amount),
            source_init_bal: Number(_transaction.source_init_bal),
            dest_init_bal: Number(_transaction.dest_init_bal),
            source_user_id: _transaction.source_user_id,
            dest_user_id: _transaction.dest_user_id,
        }
    }
    async delete(id: number): Promise<Transaction> {
        const _transaction = await this.prisma.transaction.delete({
            where: {
                id: id.toString()
            }
        })

        return {
            id: _transaction.id,
            amount: Number(_transaction.amount),
            source_init_bal: Number(_transaction.source_init_bal),
            dest_init_bal: Number(_transaction.dest_init_bal),
            source_user_id: _transaction.source_user_id,
            dest_user_id: _transaction.dest_user_id,
        }
    }
    
}
