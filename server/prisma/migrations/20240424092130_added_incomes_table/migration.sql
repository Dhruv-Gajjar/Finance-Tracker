/*
  Warnings:

  - Changed the type of `category` on the `Expenses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `category` on the `Incomes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('bill', 'grocery', 'emi', 'rent', 'subscribtion', 'insurance', 'food', 'travel');

-- CreateEnum
CREATE TYPE "IncomeCategory" AS ENUM ('salary', 'bonus', 'investment', 'gift', 'rental_income', 'other');

-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "category",
ADD COLUMN     "category" "ExpenseCategory" NOT NULL;

-- AlterTable
ALTER TABLE "Incomes" DROP COLUMN "category",
ADD COLUMN     "category" "IncomeCategory" NOT NULL;
