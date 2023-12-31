import { ContainerBuilder, Definition } from 'node-dependency-injection';
import { DomainEvent } from '@smu-chile/pkg-value-object';
import { DomainEventSubscriber } from '@smu-chile/pkg-smu-backend';

export class DomainEventSubscribers {
  private constructor(public items: Array<DomainEventSubscriber<DomainEvent>>) { }

  static from(container: ContainerBuilder): DomainEventSubscribers {
    const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<String, Definition>;
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

    subscriberDefinitions.forEach((value: Definition, key: String) => {
      const domainEventSubscriber = container.get<DomainEventSubscriber<DomainEvent>>(key.toString());
      subscribers.push(domainEventSubscriber);
    });

    return new DomainEventSubscribers(subscribers);
  }
}
