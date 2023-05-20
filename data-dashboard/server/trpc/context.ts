import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { initializeService } from '../init';
import { User } from '../models';

export const createContextInner = async () => {
  const service = initializeService();
  if (service === null) {
    throw new Error('Service failed to initialize');
  }
  return {
    ...service,
  };
};

export const createContext = async (opts: CreateNextContextOptions) => {
  const innerContext = await createContextInner();
  const user: () => Promise<User | null> = async () => null;
  return {
    ...innerContext,
    req: opts.req,
    res: opts.res,
    user,
  };
};

export type TContext = inferAsyncReturnType<typeof createContext>;
