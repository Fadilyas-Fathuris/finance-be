-- CreateEnum
CREATE TYPE "DisbursementStatus" AS ENUM ('pending', 'paid', 'cancelled');

-- CreateTable
CREATE TABLE "InvestorDisbursement" (
    "id" TEXT NOT NULL,
    "investorName" TEXT NOT NULL,
    "businessLine" "BusinessLine" NOT NULL,
    "periodMonth" INTEGER NOT NULL,
    "periodYear" INTEGER NOT NULL,
    "netProfit" DECIMAL(15,2) NOT NULL,
    "sharePercent" DOUBLE PRECISION NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "status" "DisbursementStatus" NOT NULL DEFAULT 'pending',
    "paidAt" TIMESTAMP(3),
    "receiptImage" TEXT,
    "notes" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorDisbursement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InvestorDisbursement" ADD CONSTRAINT "InvestorDisbursement_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
