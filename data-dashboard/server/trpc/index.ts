import { initTRPC } from '@trpc/server';
import { TInnerContext } from './context';

const t = initTRPC.context<TInnerContext>().create();

export const { router } = t;
export const { procedure: publicProcedure } = t;
