/*
  Warnings:

  - You are about to drop the column `img` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "social"."posts" DROP COLUMN "img",
ADD COLUMN     "image_name" VARCHAR(400),
ADD COLUMN     "image_url" VARCHAR(400);
