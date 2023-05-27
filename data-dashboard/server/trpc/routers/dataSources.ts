import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { privateProcedure, router } from '..';

const XLSX_FILE_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

const CreateDataSourceSchema = z.object({
  boardId: z.string(),
  encodedFile: z.string(), // base64 encoded file
  fileName: z.string(),
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
        const { encodedFile, boardId } = input;

        const board = await ctx.boardsRepository.findOne(input.boardId);

        if (board.ownerId !== user.id) {
          throw new TRPCError({
            code: 'FORBIDDEN',
          });
        }

        if (!encodedFile.startsWith(`data:${XLSX_FILE_TYPE};base64,`)) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'File is not of type XLSX',
          });
        }

        const fileBuffer = Buffer.from(encodedFile, 'base64');
        const { fileName } = input;
        const fileHandle = await ctx.fileStorage.uploadFile(fileName, fileBuffer);

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
});

export default dataSourcesRouter;
