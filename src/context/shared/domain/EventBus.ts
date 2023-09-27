import { DomainEventSubscribers } from '../infrastructure/event-bus/DomainEventSubscribers';
import { DomainEvent } from '@smu-chile/pkg-value-object';

export interface EventBus {
  publish(events: Array<DomainEvent>): Promise<void>;
  addSubscribers(subscribers: DomainEventSubscribers): void; // Dependencia circular
}
