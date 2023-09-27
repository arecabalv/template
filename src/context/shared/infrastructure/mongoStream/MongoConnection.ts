import { MongoClient } from 'mongodb';
import MongoConfig from '../persistance/mongo/MongoConfig';

export class MongoConnection {
  private client: MongoClient;

  constructor(config: MongoConfig) {
    this.client = new MongoClient(config.url);
  }

  async suscribe() {
    const clientConnect = (await this.client.connect()).db()
    const watchDb = clientConnect.watch();

    return watchDb
  }

  async unSuscribe() {
    const clientConnect = await this.client.connect()
    clientConnect.close()
  }
}
