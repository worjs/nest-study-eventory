/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `club` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `club_join` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "club" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "club_join" DROP COLUMN "deleted_at";
