/*
  Warnings:

  - You are about to drop the `RW_DataMigration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RW_DataMigration";
PRAGMA foreign_keys=on;
