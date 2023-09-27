import { ChangeStreamSuscribe } from '@context/shared/domain/ChangeStreamSuscribe';
import { ContainerBuilder, Definition } from 'node-dependency-injection';

export class MongoStreamSuscription {
  private constructor(public items: Array<ChangeStreamSuscribe>) { }

  static from(container: ContainerBuilder): MongoStreamSuscription {
    const subscriberDefinitions = container.findTaggedServiceIds('changeStreamSuscribe') as Map<string, Definition>;
    const subscribers: Array<ChangeStreamSuscribe> = [];

    subscriberDefinitions.forEach((_value: Definition, key: string) => {
      const eventSuscriber = container.get<ChangeStreamSuscribe>(key.toString());
      subscribers.push(eventSuscriber);
    });

    return new MongoStreamSuscription(subscribers);
  }
}
