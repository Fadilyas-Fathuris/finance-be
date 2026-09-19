-- CreateTable
CREATE TABLE "VenuePartner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'static',
    "contactPerson" TEXT NOT NULL,
    "phone" TEXT,
    "bankName" TEXT,
    "bankAccount" TEXT,
    "totalTransactions" INTEGER NOT NULL DEFAULT 0,
    "pricePerTrx" DECIMAL(15,2) NOT NULL DEFAULT 35000,
    "monthlyRevenue" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "baseSharePercent" DOUBLE PRECISION NOT NULL DEFAULT 15,
    "bonusSharePercent" DOUBLE PRECISION NOT NULL DEFAULT 20,
    "tierThreshold" INTEGER NOT NULL DEFAULT 50,
    "customSharePercent" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'active',
    "businessLine" "BusinessLine" NOT NULL DEFAULT 'snapcala',
    "lastSettlementMonth" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VenuePartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VenueSettlement" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "venueName" TEXT NOT NULL,
    "periodMonth" TEXT NOT NULL,
    "totalTransactions" INTEGER NOT NULL,
    "pricePerTrx" DECIMAL(15,2) NOT NULL,
    "grossRevenue" DECIMAL(15,2) NOT NULL,
    "effectiveSharePercent" DOUBLE PRECISION NOT NULL,
    "partnerPayout" DECIMAL(15,2) NOT NULL,
    "snapcalaNet" DECIMAL(15,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'settled',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VenueSettlement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VenueSettlement" ADD CONSTRAINT "VenueSettlement_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "VenuePartner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
