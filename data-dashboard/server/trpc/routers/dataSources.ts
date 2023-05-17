import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';
import { publicProcedure, privateProcedure, router } from '..';

const XLSX_FILE_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

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
  createDataSource: publicProcedure
    .input(
      z.object({
        encodedFile: z.string(), // base64 encoded file
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { encodedFile } = input;
        console.log({ encodedFile });
        const filePath = path.join(process.cwd(), 'public', 'output.xlsx');

        const fileType = encodedFile.split(';')[0].split('data:')[1];
        if (fileType !== XLSX_FILE_TYPE) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'File must be of type xlsx',
          });
        }

        const base64Data = encodedFile.replace(/^data:.*\/.*;base64,/, '');

        const buffer = Buffer.from(base64Data, 'base64');

        fs.writeFileSync(filePath, buffer);

        await ctx.fileStorage.uploadFile(filePath);

        return {
          success: true,
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
