import { DomainEventSubscriber } from '@smu-chile/pkg-smu-backend';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { DomainEvent } from '@smu-chile/pkg-value-object';
import { KafkaConsumer } from './KafkaConsumer';
import { KafkaConnection } from './KafkaConnection';

export class KafkaConsumerFactory {
  constructor(private deserializer: DomainEventDeserializer, private connection: KafkaConnection) { }

  build(subscriber: DomainEventSubscriber<DomainEvent>) {
    return new KafkaConsumer(subscriber, this.deserializer, this.connection);
  }
}
