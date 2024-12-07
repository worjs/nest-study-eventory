/*
  Warnings:

  - You are about to drop the `_UserClubs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserClubs" DROP CONSTRAINT "_UserClubs_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserClubs" DROP CONSTRAINT "_UserClubs_B_fkey";

-- DropTable
DROP TABLE "_UserClubs";

-- CreateTable
CREATE TABLE "club_member" (
    "id" SERIAL NOT NULL,
    "club_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "club_member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "club_member_club_id_user_id_key" ON "club_member"("club_id", "user_id");

-- AddForeignKey
ALTER TABLE "club_member" ADD CONSTRAINT "club_member_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_member" ADD CONSTRAINT "club_member_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
