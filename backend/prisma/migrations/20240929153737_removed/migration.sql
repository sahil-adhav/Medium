/*
  Warnings:

  - You are about to drop the `Comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BlogToComments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "_BlogToComments" DROP CONSTRAINT "_BlogToComments_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlogToComments" DROP CONSTRAINT "_BlogToComments_B_fkey";

-- DropTable
DROP TABLE "Comments";

-- DropTable
DROP TABLE "_BlogToComments";
