export interface IMQRepository {
    produce(topic: any, messages: any): Promise<void>;
    consume(topic: any, callback: any): Promise<void>;
}