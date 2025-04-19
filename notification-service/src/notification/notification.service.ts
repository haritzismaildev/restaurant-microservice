import { Injectable, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class NotificationService {
  private channel: amqp.Channel;
  private readonly logger = new Logger(NotificationService.name);

  constructor() {
    this.initRabbitMQ();
  }

  async initRabbitMQ() {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL);
      this.channel = await connection.createChannel();
      await this.channel.assertExchange('order_exchange', 'fanout', { durable: false });

      // Create and bind queue for notifications
      const queue = 'order.confirmation';
      await this.channel.assertQueue(queue, { durable: false });
      await this.channel.bindQueue(queue, 'order_exchange', '');

      this.channel.consume(queue, async (msg) => {
        if (msg !== null) {
          const order = JSON.parse(msg.content.toString());
          this.logger.log(`Sending notification for order: ${JSON.stringify(order)}`);
          // Simulate sending email
          this.logger.log(`Email sent to user for order ${order.orderId}`);
          this.channel.ack(msg);
        }
      });
    } catch (error) {
      this.logger.error('RabbitMQ connection error', error);
    }
  }
}
