-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CEO', 'CFO', 'MANAGER', 'STAFF');

-- CreateEnum
CREATE TYPE "BusinessLine" AS ENUM ('global', 'niskala', 'aksalab', 'snapcala');

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "businessLine" "BusinessLine" NOT NULL DEFAULT 'global';

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "businessLine" "BusinessLine" NOT NULL DEFAULT 'global';

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "businessLine" "BusinessLine" NOT NULL DEFAULT 'niskala',
ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedById" TEXT,
ADD COLUMN     "deletionReason" TEXT,
ADD COLUMN     "receiptImage" TEXT,
ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "Opex" ADD COLUMN     "businessLine" "BusinessLine" NOT NULL DEFAULT 'global',
ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedById" TEXT,
ADD COLUMN     "deletionReason" TEXT,
ADD COLUMN     "receiptImage" TEXT,
ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "businessLine" "BusinessLine" NOT NULL DEFAULT 'niskala',
ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedById" TEXT,
ADD COLUMN     "deletionReason" TEXT,
ADD COLUMN     "receiptImage" TEXT,
ADD COLUMN     "updatedById" TEXT;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STAFF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opex" ADD CONSTRAINT "Opex_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opex" ADD CONSTRAINT "Opex_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opex" ADD CONSTRAINT "Opex_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
