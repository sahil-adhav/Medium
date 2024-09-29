/*
  Warnings:

  - You are about to drop the column `comments` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "comments";

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BlogToComments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BlogToComments_AB_unique" ON "_BlogToComments"("A", "B");

-- CreateIndex
CREATE INDEX "_BlogToComments_B_index" ON "_BlogToComments"("B");

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogToComments" ADD CONSTRAINT "_BlogToComments_A_fkey" FOREIGN KEY ("A") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogToComments" ADD CONSTRAINT "_BlogToComments_B_fkey" FOREIGN KEY ("B") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
