-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "businessLine" "BusinessLine" NOT NULL DEFAULT 'niskala';

-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN     "businessLine" "BusinessLine" NOT NULL DEFAULT 'niskala';
