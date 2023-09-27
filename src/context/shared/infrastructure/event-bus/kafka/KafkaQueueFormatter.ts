import { DomainEventSubscriber } from '@smu-chile/pkg-smu-backend';
import { DomainEvent } from '@smu-chile/pkg-value-object';

export class KafkaQueueFormatter {
  constructor(private moduleName: string) { }

  format(subscriber: DomainEventSubscriber<DomainEvent>) {
    const value = subscriber.constructor.name;
    const name = value
        .split(/(?=[A-Z])/)
        .join('_')
        .toLowerCase();
    return `${this.moduleName}.${name}`;
  }
}
