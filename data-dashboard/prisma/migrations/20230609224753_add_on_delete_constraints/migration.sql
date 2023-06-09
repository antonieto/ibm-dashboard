-- DropForeignKey
ALTER TABLE "Boards" DROP CONSTRAINT "Boards_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Chart_colors" DROP CONSTRAINT "Chart_colors_chart_id_fkey";

-- DropForeignKey
ALTER TABLE "Chart_settings" DROP CONSTRAINT "Chart_settings_chart_id_fkey";

-- DropForeignKey
ALTER TABLE "Charts" DROP CONSTRAINT "Charts_board_id_fkey";

-- DropForeignKey
ALTER TABLE "Charts" DROP CONSTRAINT "Charts_data_source_id_fkey";

-- DropForeignKey
ALTER TABLE "Data_series" DROP CONSTRAINT "Data_series_chart_setting_id_fkey";

-- DropForeignKey
ALTER TABLE "Data_sources" DROP CONSTRAINT "Data_sources_board_id_fkey";

-- AddForeignKey
ALTER TABLE "Boards" ADD CONSTRAINT "Boards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data_sources" ADD CONSTRAINT "Data_sources_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Boards"("board_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charts" ADD CONSTRAINT "Charts_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Boards"("board_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charts" ADD CONSTRAINT "Charts_data_source_id_fkey" FOREIGN KEY ("data_source_id") REFERENCES "Data_sources"("data_source_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart_colors" ADD CONSTRAINT "Chart_colors_chart_id_fkey" FOREIGN KEY ("chart_id") REFERENCES "Charts"("chart_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart_settings" ADD CONSTRAINT "Chart_settings_chart_id_fkey" FOREIGN KEY ("chart_id") REFERENCES "Charts"("chart_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data_series" ADD CONSTRAINT "Data_series_chart_setting_id_fkey" FOREIGN KEY ("chart_setting_id") REFERENCES "Chart_settings"("chart_setting_id") ON DELETE CASCADE ON UPDATE CASCADE;
