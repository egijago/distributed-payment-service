import KafkaConfig from "../../data-access/kafka-config";
import { IMQRepository } from "./mq-repository";

export class MQRepositoryImpl implements IMQRepository{
    constructor (private kafkaConfig: KafkaConfig) {}
    async produce(topic: any, messages: any): Promise<void> {
        return await this.kafkaConfig.produce(topic, messages);
    }
    async consume(topic: any, callback: any): Promise<void> {
        return await this.kafkaConfig.consume(topic, callback);
    }
}