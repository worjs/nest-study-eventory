/*
  Warnings:

  - You are about to drop the column `category_id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_category_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "category_id";
