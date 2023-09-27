import { Character } from '@context/cache/domain/Character';
import { CacheRepository } from '@context/cache/domain/contracts/CacheRepository';
import Client from '@context/shared/infrastructure/client/Client';
import { APICharacterResponse } from './ApiCharacterResponse';
import httpStatus from 'http-status';
import { GenericNotFoundError } from '@smu-chile/pkg-smu-backend';

export class ApiCacheRepository extends Client implements CacheRepository {
  async find(id: number): Promise<Character> {
    const { status, data } = await this.get<APICharacterResponse>(`https://rickandmortyapi.com/api/character/${id}`);
    if (status !== httpStatus.OK) throw new GenericNotFoundError();

    const { name, species } = data;
    return Character.create(id, name, data.status, species);
  }
}
