import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { privateProcedure, router } from '..';

const CreateDataSourceSchema = z.object({
  boardId: z.string(),
  fileHandle: z.string(),
  fileName: z.string(),
});

const DescribeDataSourceSchema = z.object({
  dataSourceId: z.string(),
});

const dataSourcesRouter = router({
  listPrivateDataSources: privateProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.user();
      const dataSources = await ctx.dataSourcesRepository.listByUserId(user.id);
      return {
        dataSources,
      };
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }),
  listPublicDataSorces: privateProcedure.query(async ({ ctx }) => {
    try {
      const dataSources = await ctx.dataSourcesRepository.listPublic();
      return {
        dataSources,
      };
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }),
  createDataSource: privateProcedure
    .input(CreateDataSourceSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.user();
        const { fileHandle, fileName, boardId } = input;

        const board = await ctx.boardsRepository.findOne(input.boardId);

        if (board.ownerId !== user.id) {
          throw new TRPCError({
            code: 'FORBIDDEN',
          });
        }

        const createdDataSource = ctx.dataSourcesRepository.create({
          boardId,
          externalHandle: fileHandle,
          fileName,
        });

        return {
          success: true,
          dataSource: createdDataSource,
        };
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to upload file',
          cause: e,
        });
      }
    }),
  describeDataSource: privateProcedure
    .input(DescribeDataSourceSchema)
    .query(async ({ ctx, input }) => {
      const { dataSourceId } = input;

      try {
        const dataSource = await ctx.dataSourcesRepository.getById(dataSourceId);

        if (dataSource === null) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Data source not found',
          });
        }

        const { categories, data } = await ctx.chartSerializer.getDataSourceDescription(dataSource);

        return {
          categories,
          previewData: data,
        };
      } catch (e) {
        if (e instanceof TRPCError) {
          throw e;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to describe data source',
        });
      }
    }),
  getDataSource: privateProcedure
    .input(DescribeDataSourceSchema)
    .query(async ({ ctx, input }) => {
      const { dataSourceId } = input;

      try {
        const dataSource = await ctx.dataSourceSerializer.getDataById(dataSourceId);

        if (dataSource === null) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Data source not found',
          });
        }

        return {
          dataSource,
        };
      } catch (e) {
        if (e instanceof TRPCError) {
          throw e;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to describe data source',
        });
      }
    }),
});

export default dataSourcesRouter;
