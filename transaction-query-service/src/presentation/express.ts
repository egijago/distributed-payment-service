import express, { Request, Response, Router, RouterOptions } from "express"
import { TransactionUseCase } from "../app/use-cases.ts/transaction-use-case"

export class ExpressPresentation {
    private router: Router
    constructor(useCase: TransactionUseCase) {
        this.router = express.Router()

        this.router.get("/transactions/:id", async (req: Request, res: Response) => {
            try {
                const id = req.params.id
                const response = await useCase.readTransaction({ id })
                res.status(200).json({success: true, data: response})
            } catch (error: any) {
                res.status(500).json({ message: error.message, success: false })
            }
        })

        this.router.get("/transactions/user/:user_id", async (req: Request, res: Response) => {
            try {
                const user_id = Number(req.params.user_id)
                const response = await useCase.readTransactionsByUserID({ user_id })
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

