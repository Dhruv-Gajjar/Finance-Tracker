/*
  Warnings:

  - The values [bills,subscribtions,insurances] on the enum `ExpenseTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExpenseTypes_new" AS ENUM ('salary', 'bill', 'grocery', 'emi', 'rent', 'subscribtion', 'insurance', 'food');
ALTER TABLE "Expenses" ALTER COLUMN "type" TYPE "ExpenseTypes_new" USING ("type"::text::"ExpenseTypes_new");
ALTER TYPE "ExpenseTypes" RENAME TO "ExpenseTypes_old";
ALTER TYPE "ExpenseTypes_new" RENAME TO "ExpenseTypes";
DROP TYPE "ExpenseTypes_old";
COMMIT;
