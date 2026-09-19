-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "status";

-- DropEnum
DROP TYPE "InvoiceStatus";
