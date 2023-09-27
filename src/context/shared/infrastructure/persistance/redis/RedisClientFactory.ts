import { RedisClientType, createClient } from 'redis';
import RedisConfig from './RedisConfig';
import { Nullable } from '@context/shared/domain/Nullable';

export class RedisClientFactory {
  private static clients: { [key: string]: RedisClientType } = {};

  static async createClient(contextName: string, config: RedisConfig) {
    let client = RedisClientFactory.getClient(contextName);

    if (!client) {
      client = await RedisClientFactory.createAndConnectClient(config);
      RedisClientFactory.registerClient(client, contextName);
    }

    return client;
  }

  private static getClient(contextName: string): Nullable<RedisClientType> {
    return RedisClientFactory.clients[contextName];
  }

  private static registerClient(client: RedisClientType, contextName: string): void {
    RedisClientFactory.clients[contextName] = client;
  }

  private static async createAndConnectClient(config: RedisConfig): Promise<RedisClientType> {
    const client = createClient(config);

    await client.connect();

    return client as RedisClientType;
  }
}
