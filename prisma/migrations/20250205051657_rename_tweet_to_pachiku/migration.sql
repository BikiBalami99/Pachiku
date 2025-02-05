/*
  Warnings:

  - You are about to drop the `Tweet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_tweetId_fkey";

-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_userId_fkey";

-- DropTable
DROP TABLE "Tweet";

-- CreateTable
CREATE TABLE "Pachiku" (
    "id" TEXT NOT NULL,
    "tweet" VARCHAR(256) NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Pachiku_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pachiku" ADD CONSTRAINT "Pachiku_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Pachiku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
