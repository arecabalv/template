import { CacheRepository } from '../domain/contracts/CacheRepository';
import { Character } from '../domain/Character';
import { InMemmoryCache } from '@context/shared/domain/InMemmoryCache';

export class CacheGetter {
  constructor(private repository: CacheRepository, private cache: InMemmoryCache<Character>) {}

  async run(id: number): Promise <Character> {
    const characterInCache = await this.cache.get<Character>(id.toString());

    if (characterInCache) return Character.create(characterInCache.id, characterInCache.name, characterInCache.status, characterInCache.species);

    const character = await this.repository.find(id);
    await this.cache.set(id.toString(), character);
    return character;
  }
}
