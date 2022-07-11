/*
  Warnings:

  - A unique constraint covering the columns `[start_time]` on the table `Sport_Schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[end_time]` on the table `Sport_Schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Sport_Schedule_start_time_key` ON `Sport_Schedule`(`start_time`);

-- CreateIndex
CREATE UNIQUE INDEX `Sport_Schedule_end_time_key` ON `Sport_Schedule`(`end_time`);
