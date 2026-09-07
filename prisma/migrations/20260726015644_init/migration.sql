-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('in', 'out');

-- CreateEnum
CREATE TYPE "SubscriberStatus" AS ENUM ('active', 'unpaid');

-- CreateEnum
CREATE TYPE "SubscriberType" AS ENUM ('subscription', 'quota');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('ongoing', 'done', 'pending');

-- CreateEnum
CREATE TYPE "OpexFreq" AS ENUM ('monthly', 'yearly');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('paid', 'unpaid', 'partial');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "type" "TransactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "units" INTEGER NOT NULL,
    "status" "SubscriberStatus" NOT NULL DEFAULT 'unpaid',
    "startDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "city" TEXT,
    "monthly" DECIMAL(15,2) NOT NULL,
    "type" "SubscriberType" NOT NULL,
    "quotaAmount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'pending',
    "value" DECIMAL(15,2) NOT NULL,
    "paid" DECIMAL(15,2) NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opex" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cat" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "freq" "OpexFreq" NOT NULL DEFAULT 'monthly',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Opex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "base" DECIMAL(15,2) NOT NULL,
    "transport" DECIMAL(15,2) NOT NULL,
    "meal" DECIMAL(15,2) NOT NULL,
    "bonus" DECIMAL(15,2) NOT NULL,
    "bpjsk" DECIMAL(15,2) NOT NULL,
    "bpjstk" DECIMAL(15,2) NOT NULL,
    "otherCut" DECIMAL(15,2) NOT NULL,
    "thp" DECIMAL(15,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL,
    "incomeTarget" DECIMAL(15,2) NOT NULL,
    "gaji" DECIMAL(15,2) NOT NULL,
    "server" DECIMAL(15,2) NOT NULL,
    "marketing" DECIMAL(15,2) NOT NULL,
    "operasional" DECIMAL(15,2) NOT NULL,
    "event" DECIMAL(15,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "num" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "clientAddr" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "due" TIMESTAMP(3) NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'unpaid',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceItem" (
    "id" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" DECIMAL(15,2) NOT NULL,
    "invoiceId" TEXT NOT NULL,

    CONSTRAINT "InvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfitShareScheme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isAuto" BOOLEAN NOT NULL,
    "isProductBased" BOOLEAN NOT NULL DEFAULT false,
    "manualBaseAmount" DECIMAL(15,2) NOT NULL,
    "productPrice" DECIMAL(15,2),
    "productQty" INTEGER,
    "hppPerYear" DECIMAL(15,2),
    "companyReservePct" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfitShareScheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfitSharePartner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "schemeId" TEXT NOT NULL,

    CONSTRAINT "ProfitSharePartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeductionItem" (
    "id" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "schemeId" TEXT NOT NULL,

    CONSTRAINT "DeductionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quotation" (
    "id" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "categoryName" TEXT NOT NULL,
    "barterValue" DECIMAL(15,2) NOT NULL,
    "garansiText" TEXT NOT NULL,
    "termsText" TEXT NOT NULL,
    "changeRequestText" TEXT NOT NULL,
    "authorizedName" TEXT,
    "clientRepresentative" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuotationItem" (
    "id" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "publishRate" DECIMAL(15,2) NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "details" TEXT NOT NULL,
    "workDays" INTEGER NOT NULL,
    "quotationId" TEXT NOT NULL,

    CONSTRAINT "QuotationItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuotationMilestone" (
    "id" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "quotationId" TEXT NOT NULL,

    CONSTRAINT "QuotationMilestone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_num_key" ON "Invoice"("num");

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfitSharePartner" ADD CONSTRAINT "ProfitSharePartner_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "ProfitShareScheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeductionItem" ADD CONSTRAINT "DeductionItem_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "ProfitShareScheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuotationItem" ADD CONSTRAINT "QuotationItem_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "Quotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuotationMilestone" ADD CONSTRAINT "QuotationMilestone_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "Quotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
