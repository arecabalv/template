import { Request } from 'express';
import { AnyZodObject } from 'zod';

export class Guardian {
  validate(schema: AnyZodObject, req: Request): void {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
  }
}
