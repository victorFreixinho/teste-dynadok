import amqp, { Channel, ChannelModel } from "amqplib";
import { injectable } from "inversify";

@injectable()
export class RabbitMQ {
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;

  async connect(): Promise<void> {
    const maxRetries = 5;
    let retries = 0;
  
    while (retries < maxRetries) {
      try {
        this.connection = await amqp.connect(process.env.RABBITMQ_URI || '');
      this.channel = await this.connection.createChannel();
        return;
      } catch (error) {
        retries++;
        if (retries === maxRetries) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  async publish(queue: string, message: string): Promise<void> {
    if (!this.channel) {
      throw new Error("RabbitMQ channel not initialized");
    }

    await this.channel.assertQueue(queue);
    this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async consume(queue: string, callback: (msg: string) => void): Promise<void> {
    if (!this.channel) {
      throw new Error("RabbitMQ channel not initialized");
    }

    await this.channel.assertQueue(queue);
    this.channel.consume(queue, (msg) => {
      if (msg) {
        callback(msg.content.toString());
        this.channel!.ack(msg);
      }
    });
  }

  async close(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();
  }
}

export default RabbitMQ;