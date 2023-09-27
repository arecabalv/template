import config from '@app/config';
import KafkaConfig from '../../event-bus/kafka/KafkaConfig';
import { logLevel } from 'kafkajs';

export class KafkaConfigFactory {
  static createConfig(): KafkaConfig {
    return {
      brokers: [config.KAFKA.BROKERS],
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username: config.KAFKA.SASL.USERNAME,
        password: config.KAFKA.SASL.PASSWORD,
      },
      logLevel: logLevel.ERROR,
      connectionTimeout: 5000,
    }
  }
}
