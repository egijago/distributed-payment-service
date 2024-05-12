import * as dotenv from "dotenv"
import express from "express"
import router from "./router"
import KafkaConfig from "./kafka-config";
import { addBalanceToUser, emitUpdateTransactionDestBalanceEvent } from "./utils";

dotenv.config()

if (!process.env.PORT) {
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)
const app = express()

app.use(express.json())
app.use(router)
app.listen(PORT, () => {
    console.log(`Listening on  http://localhost:${PORT}`)
})

const kafkaConfig = new KafkaConfig();
const DLQ: any[] = [];
kafkaConfig.consume("transaction", async (key: any, value: any) => {
    value = JSON.parse(value)
    console.log(value)
    if (value.type == "create-response") {
        if (value.success) {
            const transaction = value.data.transaction
            const { data, success } = await addBalanceToUser(transaction.dest_user_id, transaction.amount)
            if (!success) { // Write ledger fail
                DLQ.push({key, value})
                console.log("Transaction failed when updating user dest balance")
            }
            await emitUpdateTransactionDestBalanceEvent({
                id: transaction.id,
                dest_init_bal: data.balance
            })
            console.log("User balance updated successfully")
        } else {
            DLQ.push({key, value})
            console.log("Transaction failed when creating transaction")    
        }
    }
    if (value.type == "update-response") {
        if (value.success) {
            console.log("Transaction successful")
        } else {
            DLQ.push({key, value})
            console.log("Transaction failed when updating transaction dest balance")
        }
    }
});


