import express, { Request, Response, Router, RouterOptions } from "express"
import { PrismaClient } from "@prisma/client"
import { UserUseCase } from "../app/use-cases.ts/user-use-case"

export class ExpressPresentation {
    private router: Router
    constructor(useCase: UserUseCase) {
        this.router = express.Router()

        this.router.post("/users", async (req: Request, res: Response) => {
            try {
                const { username, password, balance } = req.body
                const response = await useCase.createUser({
                    username,
                    password,
                    balance,
                })              
                res.status(201).json({success: true, data: response})
            } catch (error: any) {
                res.status(500).json({ message: error.message, success: false })
            }
        })

        this.router.get("/users/:id", async (req: Request, res: Response) => {
            try {
                const id = Number(req.params.id)
                const response = await useCase.readUser({ id })
                res.status(200).json({success: true, data: response})
            } catch (error: any) {
                res.status(500).json({ message: error.message, success: false })
            }
        })

        this.router.get("/users", async (req: Request, res: Response) => {
            try {
                const response = await useCase.readAllUsers({})
                res.status(200).json({success: true, data: response})
            } catch (error: any) {
                res.status(500).json({ message: error.message, success: false })
            }
        })

        this.router.put("/users/:id", async (req: Request, res: Response) => {
            try {
                const id = Number(req.params.id)
                const { username, password, balance } = req.body
                const response = await useCase.updateUser({
                    id,
                    username,
                    password,
                    balance,
                })
                res.status(200).json({success: true, data: response})
            } catch (error: any) {
                res.status(500).json({ message: error.message, success: false })
            }
        })

        this.router.delete("/users/:id", async (req: Request, res: Response) => {
            try {
                const id = Number(req.params.id)
                const response = await useCase.deleteUser({ id })
                res.status(200).json({success: true, data: response})
            } catch (error: any) {
                res.status(500).json({ message: error.message, success: false })
            }
        })

        this.router.post("/users/:id/balance/add", async (req: Request, res: Response) => {
            try {
                const id = Number(req.params.id)
                const amount = Number(req.body.amount)
                const response = await useCase.addBalanceToUser({ id, amount })
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

