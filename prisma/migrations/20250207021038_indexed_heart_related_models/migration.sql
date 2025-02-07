-- DropIndex
DROP INDEX "Like_pachikuId_idx";

-- DropIndex
DROP INDEX "Like_userId_idx";

-- CreateIndex
CREATE INDEX "Like_userId_pachikuId_idx" ON "Like"("userId", "pachikuId");

-- CreateIndex
CREATE INDEX "Like_pachikuId_userId_idx" ON "Like"("pachikuId", "userId");

-- CreateIndex
CREATE INDEX "Pachiku_likes_idx" ON "Pachiku"("likes");
