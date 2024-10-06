-- CreateTable
CREATE TABLE "Records" (
    "Wallet_address" TEXT NOT NULL,
    "Device_id" TEXT NOT NULL,
    "SST_value" DOUBLE PRECISION NOT NULL,
    "Latitude" DOUBLE PRECISION NOT NULL,
    "Longitude" DOUBLE PRECISION NOT NULL,
    "End_balance" DOUBLE PRECISION NOT NULL,
    "Gaia_balance" DOUBLE PRECISION NOT NULL,
    "Claimed" BOOLEAN NOT NULL DEFAULT false,
    "Time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Records_pkey" PRIMARY KEY ("Wallet_address")
);

-- CreateIndex
CREATE UNIQUE INDEX "Records_Device_id_key" ON "Records"("Device_id");
