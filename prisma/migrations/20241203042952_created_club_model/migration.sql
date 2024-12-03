-- AlterTable
ALTER TABLE "event" ADD COLUMN     "club_id" INTEGER,
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "club" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "leader_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserClubs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "club_leader_id_key" ON "club"("leader_id");

-- CreateIndex
CREATE UNIQUE INDEX "_UserClubs_AB_unique" ON "_UserClubs"("A", "B");

-- CreateIndex
CREATE INDEX "_UserClubs_B_index" ON "_UserClubs"("B");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club" ADD CONSTRAINT "club_leader_id_fkey" FOREIGN KEY ("leader_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserClubs" ADD CONSTRAINT "_UserClubs_A_fkey" FOREIGN KEY ("A") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserClubs" ADD CONSTRAINT "_UserClubs_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
