/*
  Warnings:

  - Added the required column `imageURL` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "imageURL" TEXT NOT NULL;