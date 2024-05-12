import express, { Request, Response } from "express"
import KafkaConfig from "./kafka-config";

const router = express.Router()
const kafkaConfig = new KafkaConfig();
router.get("/", async (req: Request, res: Response) => {
    try {
        const event = {
            "type": "create",
            "data": {
                "id": "1",
                "amount": 100,
                "source_init_bal": 1000,
                "dest_init_bal": 1000,
                "source_user_id": 1,
                "dest_user_id": 2
            }
          };
        const messages = [{ key: "", value: JSON.stringify(event) }];
        await kafkaConfig.produce("transaction", messages);
        res.status(200).json({ message: "Success", success: true })
    } catch (error: any) {
        res.status(500).json({ message: error.message, success: false })
    }
})



export default router