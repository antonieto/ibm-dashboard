-- DropForeignKey
ALTER TABLE "Data_sources" DROP CONSTRAINT "Data_sources_board_id_fkey";

-- AlterTable
ALTER TABLE "Data_sources" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "board_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Data_sources" ADD CONSTRAINT "Data_sources_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Boards"("board_id") ON DELETE SET NULL ON UPDATE CASCADE;
