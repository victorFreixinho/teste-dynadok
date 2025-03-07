import { injectable } from "inversify";
import { MessagingManager } from "../../ports/output/messaging/MessagingManager";
import RabbitMQ from "./RabbitMQ";

@injectable()
export class MessagingManagerImpl implements MessagingManager {
  
  private rabbitMQ: RabbitMQ;

  constructor() {
    this.rabbitMQ = new RabbitMQ();
  }

  async connect(): Promise<void> {
    await this.rabbitMQ.connect();
  }

  async publish(queue: string, message: string): Promise<void> {
    try {
      await this.rabbitMQ.publish(queue, message);
      console.log(`Message published to queue "${queue}": ${message}`);
    } catch (error) {
      console.error(`Failed to publish message to queue "${queue}":`, error);
      throw error;
    }
  }

  async consume(
    queue: string,
    callback: (message: string) => void
  ): Promise<void> {
    try {
      await this.rabbitMQ.consume(queue, callback);
      console.log(`Consuming messages from queue "${queue}"`);
    } catch (error) {
      console.error(`Failed to consume messages from queue "${queue}":`, error);
      throw error;
    }
  }

  async close(): Promise<void> {
    await this.rabbitMQ.close();
    console.log("MessagingManager: RabbitMQ connection closed");
  }
}