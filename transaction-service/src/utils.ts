import KafkaConfig from "./kafka-config";

const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const kafkaConfig = new KafkaConfig();

export const DEFAULT_BALANCE = -1

export function generateIdempotenceKey(): string {
    return uuidv4();
}   

export async function emitCreateTransactionEvent({
    id,
    source_init_bal,
    dest_init_bal,
    amount,
    source_user_id,
    dest_user_id
}: {
    id: string,
    source_init_bal: number,
    dest_init_bal: number,
    amount: number,
    source_user_id: number,
    dest_user_id: number
}) {
    const event = {
        "type": "create",
        "data": {
            "id": id,
            "amount": amount,
            "source_init_bal": source_init_bal,
            "dest_init_bal": dest_init_bal,
            "source_user_id": source_user_id,
            "dest_user_id": dest_user_id
        }
      };
    const messages = [{ key: "", value: JSON.stringify(event) }];
    await kafkaConfig.produce("transaction", messages);
}

export async function emitUpdateTransactionDestBalanceEvent({
    id,
    dest_init_bal,
}: {
    id: string,
    dest_init_bal: number,
}) {
    const event = {
        "type": "update",
        "data": {
            "id": id,
            "dest_init_bal": dest_init_bal
        }
    };
    const messages = [{ key: "", value: JSON.stringify(event) }];
    await kafkaConfig.produce("transaction", messages);
}

const userServiceUrl = process.env.USER_SERVICE_URL;
export async function addBalanceToUser(id: number, amount: number) {
    const data = {
        amount: amount
    }
    const response = await axios.post(`http://user-service:8000/users/${id}/balance/add`, data)
    return response
}

