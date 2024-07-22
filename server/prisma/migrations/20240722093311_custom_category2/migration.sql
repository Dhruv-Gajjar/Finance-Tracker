-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('bill', 'grocery', 'emi', 'rent', 'subscribtion', 'insurance', 'food', 'travel');

-- CreateEnum
CREATE TYPE "IncomeCategory" AS ENUM ('salary', 'bonus', 'investment', 'gift', 'rental_income', 'other');

-- AlterTable
ALTER TABLE "Expenses" ALTER COLUMN "type" SET DEFAULT 'income';
