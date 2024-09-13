-- AlterTable
ALTER TABLE "Blueprint" ADD COLUMN     "aiData" JSONB,
ADD COLUMN     "buyPair" TEXT,
ADD COLUMN     "exchange" TEXT,
ADD COLUMN     "expiry" TEXT,
ADD COLUMN     "maxOrder" TEXT,
ADD COLUMN     "minOrder" TEXT,
ADD COLUMN     "sellPair" TEXT,
ADD COLUMN     "stake" TEXT,
ADD COLUMN     "stopLoss" TEXT,
ADD COLUMN     "takeProfit" TEXT,
ADD COLUMN     "tradeType" TEXT;
