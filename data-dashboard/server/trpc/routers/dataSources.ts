import {TRPCError} from '@trpc/server';
import { privateProcedure, router } from '..';

const dataSourcesRouter = router({
  listDataSources: privateProcedure.query(async ({ ctx }) => {
    try {
    const files = await ctx.fileStorage.getFiles();
    return {
      fileNames: files,
    };
    } catch(e) {
      console.error(e);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
      })
    }
  }),
});

export default dataSourcesRouter;
