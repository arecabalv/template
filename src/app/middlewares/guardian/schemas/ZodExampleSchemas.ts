import { AnyZodObject, z as guardian } from 'zod';

export class ZodExampleSchemas {
  example(): AnyZodObject {
    return guardian.object({
      query: guardian.object({
        sc: guardian.string(),
      }),
      body: guardian.object({
        amount: guardian.number(),
      }),
    })
  }
}
