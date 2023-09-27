import { ChangeStreamSuscribe } from '@context/shared/domain/ChangeStreamSuscribe';
import { MongoConnection } from './MongoConnection';
import { MongoConsumer } from './MongoConsumer';

export class MongoConsumerFactory {
  constructor(private connection: MongoConnection) {}

  build(subscriber: ChangeStreamSuscribe) {
    return new MongoConsumer(subscriber, this.connection);
  }
}
