/*
  Warnings:

  - A unique constraint covering the columns `[userId,pachikuId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Pachiku" ADD COLUMN     "numOfComments" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_pachikuId_key" ON "Like"("userId", "pachikuId");
