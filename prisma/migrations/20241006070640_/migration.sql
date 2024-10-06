/*
  Warnings:

  - The primary key for the `Records` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "Records_Device_id_key";

-- AlterTable
ALTER TABLE "Records" DROP CONSTRAINT "Records_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Records_pkey" PRIMARY KEY ("id");
