import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependency-injection';
import { GetCacheController } from '@app/controllers/cache/GetCacheController';

export const register = (router: Router) => {
  const getController: GetCacheController = container.get('Controller.Get.UserCache');
  router.get('/character/:id', (req: Request, res: Response, next: NextFunction) => {
    return getController.run(req, res, next);
  });
};
