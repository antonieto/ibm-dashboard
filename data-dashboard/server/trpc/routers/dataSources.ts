import { publicProcedure, router } from '..';

const dataSourcesRouter = router({
  listDataSources: publicProcedure
    .query(async ({ ctx }) => {
      const files = await ctx.fileStorage.getFiles();
      return {
        fileNames: files,
      };
    }),
});

export default dataSourcesRouter;
