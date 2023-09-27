import container from '@app/dependency-injection';
import { Logger } from 'winston';
import { KafkaConnection } from './KafkaConnection';
import { KafkaMessage } from 'kafkajs';
import { DomainEvent } from '@smu-chile/pkg-value-object';
import { DomainEventSubscriber } from '@smu-chile/pkg-smu-backend';
import { DomainEventDeserializer } from '../DomainEventDeserializer';

export class KafkaConsumer {
  private logger: Logger = container.get('Shared.Logger');
  constructor(private subscriber: DomainEventSubscriber<DomainEvent>, private deserializer: DomainEventDeserializer, private connection: KafkaConnection) { }

  async onMessage(topic: string, message: KafkaMessage) {
    if (!message.value) return;
    const content = message.value.toString();
    const domainEvent = this.deserializer.deserialize(content);
    try {
      await this.subscriber.on(domainEvent);
    } catch (error: any) {
      this.logger.error(`[EVENT NAME]: ${domainEvent.eventName}, [EVENT ID]: ${domainEvent.eventId}, [ERROR STACK]: ${error.stack}`);
      this.handleError(topic, message, domainEvent.maxRetries);
    }
  }

  private async handleError(topic: string, message: KafkaMessage, maxRetries: number) {
    if (this.hasBeenRedeliveredTooMuch(message, maxRetries)) {
      await this.deadLetter(message)
    } else {
      await this.retry(topic, message);
    }
  }

  private async retry(topic: string, message: KafkaMessage) {
    await this.connection.retry(topic, message)
  }

  private async deadLetter(message: KafkaMessage) {
    await this.connection.deadLetter(message)
  }

  private hasBeenRedeliveredTooMuch(message: KafkaMessage, maxRetries: number) {
    if (this.hasBeenRedelivered(message)) {
      const count = parseInt(message!.headers!['redelivery_count'] as string);
      return count >= maxRetries;
    }
    return false;
  }

  private hasBeenRedelivered(message: KafkaMessage) {
    return message.headers !== undefined && message.headers['redelivery_count'] !== undefined;
  }
}
