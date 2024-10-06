/*
  Warnings:

  - A unique constraint covering the columns `[Wallet_address]` on the table `Records` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Records_Wallet_address_key" ON "Records"("Wallet_address");
