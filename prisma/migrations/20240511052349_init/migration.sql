-- CreateEnum
CREATE TYPE "Title" AS ENUM ('farmer', 'owner', 'customer');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Poultry', 'Livestock', 'Vegetables');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "f_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "l_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "productId" INTEGER,
    "upDated" TIMESTAMP(3),
    "dateTime" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "salesId" INTEGER,
    "purchasesId" INTEGER,
    "image" INTEGER,
    "title" "Title" NOT NULL DEFAULT 'farmer',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "upDated" TIMESTAMP(3),
    "categories" "Category" NOT NULL DEFAULT 'Livestock',

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sales" (
    "id" SERIAL NOT NULL,
    "quantity" BIGINT,
    "price" BIGINT,
    "itemName" TEXT,
    "upDated" TIMESTAMP(3),
    "dateTime" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchases" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" BIGINT,
    "name" TEXT,
    "upDated" TIMESTAMP(3),
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "Sales"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_purchasesId_fkey" FOREIGN KEY ("purchasesId") REFERENCES "Purchases"("id") ON DELETE SET NULL ON UPDATE CASCADE;
