/*
  Warnings:

  - A unique constraint covering the columns `[chart_id]` on the table `Chart_settings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Chart_settings_chart_id_key" ON "Chart_settings"("chart_id");
