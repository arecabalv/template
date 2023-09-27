import { Character } from '../Character';

export interface CacheRepository {
  find(id: number): Promise<Character>;
}
