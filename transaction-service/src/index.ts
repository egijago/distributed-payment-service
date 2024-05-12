import * as dotenv from "dotenv"
import express from "express"
import router from "./router"
import KafkaConfig from "./kafka-config";

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
kafkaConfig.consume("transaction", (key: any, value: any) => {
    console.log("📨 Receive message: ", value, key);
});


