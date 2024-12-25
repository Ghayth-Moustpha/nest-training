/*
  Warnings:

  - Added the required column `imageURL` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'no description',
ADD COLUMN     "imageURL" TEXT NOT NULL;
