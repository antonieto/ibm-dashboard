import { initTRPC, TRPCError } from '@trpc/server';
import { verify } from 'jsonwebtoken';
import { TContext } from './context';

const t = initTRPC.context<TContext>().create();

const isAuthed = t.middleware(({ ctx, next }) => {
  try {
    const { req } = ctx;
    const token = req.cookies.get('access-token')?.value;

    console.log(token);

    if (!token) throw new TRPCError({ code: 'UNAUTHORIZED' });

    verify(token, 'chairesesunindividuomuyguapo');

    return next();
  } catch (error) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
});

export const { router, middleware } = t;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthed);
