import { Server } from './Server';
import config from '../config';
import container from '@app/dependency-injection';
import { KafkaConnection } from '@context/shared/infrastructure/event-bus/kafka/KafkaConnection';
import { EventBus } from '@context/shared/domain/EventBus';
import { DomainEventSubscribers } from '@context/shared/infrastructure/event-bus/DomainEventSubscribers';

export class Run {
  server?: Server;

  async start() {
    this.server = new Server(Number(config.PORT));

    await this.configureEventBus();
    return this.server.listen();
  }

  async stop() {
    return this.server?.stop();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  private async configureEventBus() {
    container.get<KafkaConnection>('Shared.KafkaConnect');
    const eventBus = container.get<EventBus>('Shared.domain.KafkaEventBus');

    eventBus.addSubscribers(DomainEventSubscribers.from(container));
  }
}
