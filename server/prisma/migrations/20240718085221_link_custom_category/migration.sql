/*
  Warnings:

  - You are about to drop the column `category` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Incomes` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Incomes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ALTER COLUMN "type" SET DEFAULT 'expense';

-- AlterTable
ALTER TABLE "Incomes" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "ExpenseCategory";

-- DropEnum
DROP TYPE "IncomeCategory";

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CustomCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incomes" ADD CONSTRAINT "Incomes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CustomCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
