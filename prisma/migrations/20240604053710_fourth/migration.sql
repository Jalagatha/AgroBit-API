/*
  Warnings:

  - Changed the type of `price` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image" TEXT,
DROP COLUMN "price",
ADD COLUMN     "price" BIGINT NOT NULL;
