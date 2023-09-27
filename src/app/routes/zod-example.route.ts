import { Guardian } from '@app/middlewares/guardian/Guardian';
import { Router, Request, Response, NextFunction } from 'express';
import { ZodExampleSchemas } from '../middlewares/guardian/schemas/ZodExampleSchemas';

const schemas = new ZodExampleSchemas();
const guardian = new Guardian();

export const register = (router: Router) => {
  router.post('/zod-example', (req: Request, res: Response, next: NextFunction) => {
    guardian.validate(schemas.example(), req);
  });
};
