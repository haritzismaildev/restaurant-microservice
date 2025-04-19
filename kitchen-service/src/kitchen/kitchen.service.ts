import { Injectable, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class KitchenService {
  private channel: amqp.Channel;
  private readonly logger = new Logger(KitchenService.name);

  constructor() {
    this.initRabbitMQ();
  }

  async initRabbitMQ() {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL);
      this.channel = await connection.createChannel();
      await this.channel.assertExchange('order_exchange', 'fanout', { durable: false });

      // Create and bind queue for kitchen
      const queue = 'order.process';
      await this.channel.assertQueue(queue, { durable: false });
      await this.channel.bindQueue(queue, 'order_exchange', '');

      this.channel.consume(queue, async (msg) => {
        if (msg !== null) {
          const order = JSON.parse(msg.content.toString());
          this.logger.log(`Received order to process: ${JSON.stringify(order)}`);
          // Simulate processing: update order status, etc.
          // In a real app, you would update the database here
          this.logger.log(`Order ${order.orderId} processed.`);
          this.channel.ack(msg);
        }
      });
    } catch (error) {
      this.logger.error('RabbitMQ connection error', error);
    }
  }
}
