import { MongoStreamSuscription } from '../infrastructure/mongoStream/MongoStreamSuscription';

export interface MongoStream {
  suscribe(suscription: MongoStreamSuscription): Promise<void>;
}
