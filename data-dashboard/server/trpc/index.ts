import { initTRPC, TRPCError } from '@trpc/server';
import { verify } from 'jsonwebtoken';
import { TContext } from './context';

const t = initTRPC.context<TContext>().create();

const isAuthed = t.middleware(({ ctx, next }) => {
  try {
    const { req } = ctx;
    const token = String(req.cookies['access-token']);
    verify(token, String(process.env.JWT_SECRET));

    return next();
  } catch (error) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
});

export const { router, middleware } = t;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthed);
