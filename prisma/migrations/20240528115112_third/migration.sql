-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'Livestock',
ADD COLUMN     "purchaseId" INTEGER,
ADD COLUMN     "salesId" INTEGER;
