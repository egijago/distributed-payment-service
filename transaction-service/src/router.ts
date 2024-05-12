import express, { Request, Response } from "express"
import KafkaConfig from "./kafka-config";
import { DEFAULT_BALANCE, addBalanceToUser, emitCreateTransactionEvent, generateIdempotenceKey } from "./utils";

const router = express.Router()
const Redis = require('ioredis');
const DEFAULT_EXPIRATION = 5 * 60; 
const TRANSACTION_QUERY_SERVICE_URL = process.env.TRANSACTION_QUERY_SERVICE_URL
const redisClient = new Redis(`${process.env.REDIS_HOSTNAME}:${process.env.REDIS_PORT}`);

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

router.get("/transactions/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        redisClient.get(`/transactions/${id}`, async (err: any, cachedData: any) => {
            if (err) {
                throw new Error('Error accessing Redis cache');
            }
            if (cachedData) {
                res.status(200).json({ success: true, data: JSON.parse(cachedData) });
            } else {
                const response = await fetch(TRANSACTION_QUERY_SERVICE_URL + "/transactions/" + id);
                const data = await response.json();
                redisClient.set(`/transactions/${id}`, JSON.stringify(data));
                res.status(200).json({ success: true, data });
            }
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message, success: false });
    }
});

router.get("/transactions/user/:user_id", async (req: Request, res: Response) => {
    try {
        const user_id = req.params.user_id;
        redisClient.get(`/transactions/user/${user_id}`, async (err: any, cachedData: any) => {
            if (err) {
                throw new Error('Error accessing Redis cache');
            }
            if (cachedData) {
                res.status(200).json({ success: true, data: JSON.parse(cachedData) });
            } else {
                const response = await fetch(TRANSACTION_QUERY_SERVICE_URL + "/transactions/user/" + user_id);
                const data = await response.json();
                redisClient.set(`/transactions/user/${user_id}`, JSON.stringify(data));
                res.status(200).json({ success: true, data });
            }
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message, success: false });
    }
});

export default router