-- CreateEnum
CREATE TYPE "club_join_status" AS ENUM ('APPLICANT', 'MEMBER', 'REJECTED');

-- AlterTable
ALTER TABLE "event" ADD COLUMN     "club_id" INTEGER;

-- CreateTable
CREATE TABLE "club" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "learder_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "max_people" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "club_join" (
    "id" SERIAL NOT NULL,
    "club_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" "club_join_status" NOT NULL DEFAULT 'APPLICANT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "club_join_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "club_join_club_id_user_id_key" ON "club_join"("club_id", "user_id");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club" ADD CONSTRAINT "club_learder_id_fkey" FOREIGN KEY ("learder_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_join" ADD CONSTRAINT "club_join_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_join" ADD CONSTRAINT "club_join_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
