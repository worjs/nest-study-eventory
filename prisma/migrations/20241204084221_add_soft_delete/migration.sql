-- AlterTable
ALTER TABLE "club" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "club_join" ADD COLUMN     "deleted_at" TIMESTAMP(3);
