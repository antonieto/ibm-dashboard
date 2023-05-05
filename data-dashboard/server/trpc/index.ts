import { initTRPC } from '@trpc/server';
import { TContext } from './context';

const t = initTRPC.context<TContext>().create();
export const { router } = t;
export const { procedure: publicProcedure } = t;
