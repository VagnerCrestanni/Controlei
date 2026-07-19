-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('income', 'expense', 'investment');

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "type" "TransactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);
