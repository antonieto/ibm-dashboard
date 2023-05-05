import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { initializeService } from '../init';

export const createContextInner = async () => {
  const service = initializeService();
  return {
    ...service,
  };
};

export const createContext = async (opts: CreateNextContextOptions) => {
  const innerContext = await createContextInner();
  return {
    ...innerContext,
    req: opts.req,
    res: opts.res,
  };
};

export type TContext = inferAsyncReturnType<typeof createContext>;