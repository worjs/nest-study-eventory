/*
  Warnings:

  - You are about to drop the column `city_id` on the `event` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_city_id_fkey";

-- AlterTable
ALTER TABLE "event" DROP COLUMN "city_id";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "refresh_token" TEXT;

-- CreateTable
CREATE TABLE "event_city" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_city_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_city_event_id_city_id_key" ON "event_city"("event_id", "city_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_city" ADD CONSTRAINT "event_city_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_city" ADD CONSTRAINT "event_city_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
