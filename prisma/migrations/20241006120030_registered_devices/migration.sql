-- CreateTable
CREATE TABLE "RegisteredKeys" (
    "id" SERIAL NOT NULL,
    "Wallet_address" TEXT NOT NULL,
    "Device_id" TEXT NOT NULL,

    CONSTRAINT "RegisteredKeys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegisteredKeys_Wallet_address_Device_id_key" ON "RegisteredKeys"("Wallet_address", "Device_id");
