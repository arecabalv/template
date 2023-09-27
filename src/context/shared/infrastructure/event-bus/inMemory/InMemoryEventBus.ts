/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
import { DomainEvent } from '@smu-chile/pkg-value-object';
import { EventBus } from '@context/shared/domain/EventBus';
import EventEmitter from 'events';
import { DomainEventSubscribers } from '../DomainEventSubscribers';

export class InMemoryEventBus extends EventEmitter implements EventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    events.map(event => this.emit(event.eventName, event))
  }

  addSubscribers(subscribers: DomainEventSubscribers) {
    subscribers.items.forEach(subscriber => {
      subscriber.subscriberTo().forEach(event => {
        this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
      });
    });
  }
}
