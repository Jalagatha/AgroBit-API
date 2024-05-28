/*
  Warnings:

  - The values [farmer] on the enum `Title` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Title_new" AS ENUM ('worker', 'owner', 'customer');
ALTER TABLE "User" ALTER COLUMN "title" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "title" TYPE "Title_new" USING ("title"::text::"Title_new");
ALTER TYPE "Title" RENAME TO "Title_old";
ALTER TYPE "Title_new" RENAME TO "Title";
DROP TYPE "Title_old";
ALTER TABLE "User" ALTER COLUMN "title" SET DEFAULT 'worker';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "image" SET DATA TYPE TEXT,
ALTER COLUMN "title" SET DEFAULT 'worker';
