import { inferAsyncReturnType } from '@trpc/server';
import { initializeService } from '../init';

export const createInnerContext = async () => initializeService();
export type TInnerContext = inferAsyncReturnType<typeof createInnerContext>;
