-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "who" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
