import * as dotenv from "dotenv"
import express from "express"
import { ExpressPresentation } from "./presentation/express"
import { TransactionUseCaseImpl } from "./app/use-cases.ts/transaction-use-case-impl"
import { TransactionRepositoryImpl } from "./app/repositories/transaction-repository-impl"
import { PrismaClient } from "@prisma/client"
import prisma from "./data-access/db.server"
import KafkaConfig from "./data-access/kafka-config"
import { MQRepositoryImpl } from "./app/repositories/mq-repository-impl"

dotenv.config()

if (!process.env.PORT) {
    process.exit(1)
}


const PORT: number = parseInt(process.env.PORT as string, 10)
const app = express()
const tranasctionRepository = new TransactionRepositoryImpl(prisma)
const kafkaConfig = new KafkaConfig();
const mqRepository = new MQRepositoryImpl(kafkaConfig)
const useCase = new TransactionUseCaseImpl(tranasctionRepository, mqRepository)
const presentation = new ExpressPresentation(useCase)
const router = presentation.getRouter()

app.use(express.json())
app.use(router)
app.listen(PORT, () => {
    console.log(`Listening on  http://localhost:${PORT}`)
})

