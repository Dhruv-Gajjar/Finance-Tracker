/*
  Warnings:

  - Added the required column `category` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Expenses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Types" AS ENUM ('income', 'expense');

-- AlterTable
ALTER TABLE "Expenses" ADD COLUMN     "category" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "Types" NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- DropEnum
DROP TYPE "ExpenseTypes";

-- CreateTable
CREATE TABLE "Incomes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" "Types" NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Incomes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Incomes" ADD CONSTRAINT "Incomes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
