import express, { Request, Response, Router, RouterOptions } from "express"
import { PrismaClient } from "@prisma/client"
import { TransactionUseCase } from "../app/use-cases.ts/transaction-use-case"

export class ExpressPresentation {
    private router: Router
    constructor(useCase: TransactionUseCase) {
        this.router = express.Router()

        this.router.post("/transactions", async (req: Request, res: Response) => {
            try {
                const { id, amount, source_init_bal, dest_init_bal, source_user_id, dest_user_id} = req.body
                const response = await useCase.createTransaction({
                    id,
                    amount,
                    source_init_bal,
                    dest_init_bal,
                    source_user_id,
                    dest_user_id
                })              
                res.status(201).json({success: true, data: response})
            } catch (error: any) {
                res.status(500).json({ message: error.message, success: false })
            }
        })

        this.router.put("/transactions/:id", async (req: Request, res: Response) => {
            try {
                const id = req.params.id
                const {
                    amount,
                    source_init_bal,
                    dest_init_bal,
                    source_user_id,
                    dest_user_id 
                } = req.body
                const response = await useCase.updateTransaction({
                    id,
                    amount,
                    source_init_bal,
                    dest_init_bal,
                    source_user_id,
                    dest_user_id
                })
                res.status(200).json({success: true, data: response})
            } catch (error: any) {
                res.status(500).json({ message: error.message, success: false })
            }
        })

        this.router.delete("/transactions/:id", async (req: Request, res: Response) => {
            try {
                const id = Number(req.params.id)
                const response = await useCase.deleteTransaction({ id })
                res.status(200).json({success: true, data: response})
            } catch (error: any) {
                res.status(500).json({ message: error.message, success: false })
            }
        })

    }

    getRouter() {
        return this.router
    }
}

