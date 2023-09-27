import { MongoConnection } from './MongoConnection';
import { MongoHandler } from './MongoHandler';

export class MongoHandlerFactory {
  static create(connection: MongoConnection): MongoHandler {
    return new MongoHandler(connection);
  }
}
