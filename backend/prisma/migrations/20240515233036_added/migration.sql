-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "publishedDate" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
