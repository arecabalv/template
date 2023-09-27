import { MongoConnection } from './MongoConnection';
import { MongoStream } from '@context/shared/domain/MongoStream';
import { MongoStreamSuscription } from './MongoStreamSuscription';
import { MongoConsumerFactory } from './MongoConsumerFactory';

export class MongoHandler implements MongoStream {
  private connection: MongoConnection;

  constructor(connection: MongoConnection) {
    this.connection = connection;
  }

  async suscribe(suscription: MongoStreamSuscription): Promise<void> {
    const consumerFactory = new MongoConsumerFactory(this.connection);

    for (const suscribe of suscription.items) {
      const consumer = await this.connection.suscribe();

      const mongoConsumer = consumerFactory.build(suscribe);
      mongoConsumer.onMessage(consumer)
    }
  }
}

