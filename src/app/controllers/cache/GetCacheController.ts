import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../BaseController';
import { CacheGetter } from '@context/cache/application/CacheGetter';

export class GetCacheController implements BaseController {
  constructor(private userGetter: CacheGetter) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const id = req.params.id;

    const character = await this.userGetter.run(Number(id));
    res.status(200).send(character.toPrimitives());
  }
}
