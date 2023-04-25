-- CreateEnum
CREATE TYPE "Chart_Type" AS ENUM ('BAR_CHART', 'LINE_CHART', 'PIE_CHART');

-- CreateTable
CREATE TABLE "Users" (
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Boards" (
    "board_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Boards_pkey" PRIMARY KEY ("board_id")
);

-- CreateTable
CREATE TABLE "Data_sources" (
    "data_source_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file_name" VARCHAR(250) NOT NULL,
    "external_handle" VARCHAR(100) NOT NULL,
    "board_id" TEXT NOT NULL,

    CONSTRAINT "Data_sources_pkey" PRIMARY KEY ("data_source_id")
);

-- CreateTable
CREATE TABLE "Charts" (
    "chart_id" TEXT NOT NULL,
    "board_id" TEXT NOT NULL,
    "data_source_id" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "x_index" INTEGER NOT NULL,
    "y_index" INTEGER NOT NULL,
    "type" "Chart_Type" NOT NULL,

    CONSTRAINT "Charts_pkey" PRIMARY KEY ("chart_id")
);

-- CreateTable
CREATE TABLE "Chart_colors" (
    "chart_colors_id" TEXT NOT NULL,
    "chart_id" TEXT NOT NULL,
    "y_color" VARCHAR(7) NOT NULL,

    CONSTRAINT "Chart_colors_pkey" PRIMARY KEY ("chart_colors_id")
);

-- CreateTable
CREATE TABLE "Chart_settings" (
    "chart_setting_id" TEXT NOT NULL,
    "chart_id" TEXT NOT NULL,
    "x_axis_col" INTEGER NOT NULL,

    CONSTRAINT "Chart_settings_pkey" PRIMARY KEY ("chart_setting_id")
);

-- CreateTable
CREATE TABLE "Data_series" (
    "data_series_id" TEXT NOT NULL,
    "chart_setting_id" TEXT NOT NULL,
    "y_axis_col" INTEGER NOT NULL,

    CONSTRAINT "Data_series_pkey" PRIMARY KEY ("data_series_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Boards" ADD CONSTRAINT "Boards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data_sources" ADD CONSTRAINT "Data_sources_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Boards"("board_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charts" ADD CONSTRAINT "Charts_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Boards"("board_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charts" ADD CONSTRAINT "Charts_data_source_id_fkey" FOREIGN KEY ("data_source_id") REFERENCES "Data_sources"("data_source_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart_colors" ADD CONSTRAINT "Chart_colors_chart_id_fkey" FOREIGN KEY ("chart_id") REFERENCES "Charts"("chart_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart_settings" ADD CONSTRAINT "Chart_settings_chart_id_fkey" FOREIGN KEY ("chart_id") REFERENCES "Charts"("chart_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data_series" ADD CONSTRAINT "Data_series_chart_setting_id_fkey" FOREIGN KEY ("chart_setting_id") REFERENCES "Chart_settings"("chart_setting_id") ON DELETE RESTRICT ON UPDATE CASCADE;
