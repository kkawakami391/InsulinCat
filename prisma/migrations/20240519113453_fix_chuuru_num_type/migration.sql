/*
  Warnings:

  - You are about to alter the column `chuuruNum` on the `insulin` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - A unique constraint covering the columns `[catId]` on the table `Insulin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `insulin` MODIFY `chuuruNum` DECIMAL(65, 30) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Insulin_catId_key` ON `Insulin`(`catId`);
