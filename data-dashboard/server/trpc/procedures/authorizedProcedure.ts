import { z } from 'zod';
import { publicProcedure } from '@/server/trpc';

const authorizedProcedure = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .use(({ ctx, next }) => {
    console.log(ctx);
    return next();
  });

export default authorizedProcedure;
