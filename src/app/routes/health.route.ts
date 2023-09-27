import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependency-injection';
import GetStatusController from '@app/controllers/health/GetHealthController';

export const register = (router: Router) => {
  const controller: GetStatusController = container.get('Controller.Health');
  router.get('/health', (req: Request, res: Response, next: NextFunction) => {
    return controller.run(req, res, next);
  });
};
