/*
  Warnings:

  - You are about to drop the column `tweetId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `tweet` on the `Pachiku` table. All the data in the column will be lost.
  - Added the required column `pachikuId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pachiku` to the `Pachiku` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_tweetId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "tweetId",
ADD COLUMN     "pachikuId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pachiku" DROP COLUMN "tweet",
ADD COLUMN     "pachiku" VARCHAR(256) NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_pachikuId_fkey" FOREIGN KEY ("pachikuId") REFERENCES "Pachiku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
