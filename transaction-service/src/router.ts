import express, { Request, Response } from "express"
import KafkaConfig from "./kafka-config";
import { DEFAULT_BALANCE, addBalanceToUser, emitCreateTransactionEvent, generateIdempotenceKey } from "./utils";

const router = express.Router()
router.post("/transactions/transfer", async (req: Request, res: Response) => {
    try {
        const { source_user_id, dest_user_id, amount } = req.body
        const idempotenceKey = generateIdempotenceKey()
        const { data } = await addBalanceToUser(source_user_id, -amount)
        if (!data.success) {
            throw new Error(data.message)
        }
        const user = data.data.user
        emitCreateTransactionEvent({
            id: idempotenceKey,
            source_init_bal: user.balance + amount,
            dest_init_bal: DEFAULT_BALANCE,
            amount,
            source_user_id,
            dest_user_id
        })
        res.status(200).json({ message: "Success", success: true })
    } catch (error: any) {
        res.status(500).json({ message: error.message, success: false })
    }
})

export default router