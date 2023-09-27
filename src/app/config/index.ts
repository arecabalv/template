import 'dotenv/config';
const env = (key: string) => {
  return process.env[key];
};

export default {
  PORT: env('PORT') ?? 3000,
  NODE_ENV: env('NODE_ENV') ?? 'dev',
  LOGGER_LEVELS: {
    DEBUG: 'debug',
    ERROR: 'error',
    INFO: 'info',
  },
  MONGO: [
    {
      DB: 'template',
      CONNECTION: env('MONGODB_TEMPLATE') ?? 'mongodb://localhost:27017/backend-template',
    },
  ],
  REDIS: [
    {
      CACHE: 'template',
      URL: env('REDIS_TEMPLATE') ?? 'redis://localhost:6379',
    },
  ],
  KAFKA: {
    BROKERS: env('KAFKA_BROKERS') ?? 'localhost:9092',
    CLIENT_ID: env('KAFKA_CLIENT_ID') ?? 'kafka-poc',
    SASL: {
      USERNAME: env('KAFKA_USERNAME') ?? '',
      PASSWORD: env('KAFKA_PASSWORD') ?? '',
      MECHANISM: env('KAFKA_MECHANISM') ?? '',
    },
  },
};
