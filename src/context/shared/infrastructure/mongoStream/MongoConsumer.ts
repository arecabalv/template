import { ChangeStreamSuscribe } from '@context/shared/domain/ChangeStreamSuscribe';
import { ChangeStream, ChangeStreamDocument, Document } from 'mongodb';
import { MongoConnection } from './MongoConnection';

export class MongoConsumer {
  constructor(private subscriber: ChangeStreamSuscribe, private connection: MongoConnection) { }

  async onMessage(consumer: ChangeStream<Document, ChangeStreamDocument<Document>>) {
    return consumer.on('change', async (changes: ChangeStreamDocument) => {
      try {
        this.subscriber.onChange(changes);
      } catch (error) {
        this.connection.unSuscribe()
      }
    });
  }
}
