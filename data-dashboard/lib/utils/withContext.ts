import { NextApiRequest, NextApiResponse } from 'next';
import { TContext, createContext } from '@/server/trpc/context';

type HandlerWithContext = (ctx: TContext) => Promise<unknown>;

const withContext = (handler: HandlerWithContext) => async (req: NextApiRequest, res: NextApiResponse) => {
  const ctx = await createContext({ req, res });
  return handler(ctx);
};

export default withContext;
