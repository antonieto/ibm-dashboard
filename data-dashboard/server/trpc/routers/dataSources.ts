import { DataSource } from "@/server/models";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { privateProcedure, router } from "..";

const XLSX_FILE_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

const dataSourcesRouter = router({
  listDataSources: privateProcedure.query(async ({ ctx }) => {
    try {
      const dataSources: DataSource[] = [];
      return {};
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
  createDataSource: privateProcedure
    .input(
      z.object({
        boardId: z.string(),
        encodedFile: z.string(), // base64 encoded file
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.user();
        const { encodedFile, boardId } = input;

        const board = await ctx.boardsRepository.findOne(input.boardId);

        if (board.ownerId !== user.id) {
          throw new TRPCError({
            code: "FORBIDDEN",
          });
        }

        return {
          success: true,
        };
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to upload file",
          cause: e,
        });
      }
    }),
});

const;

export default dataSourcesRouter;
