-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prediction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "teamId" INTEGER,
    "prediction" TEXT NOT NULL,
    CONSTRAINT "Prediction_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Prediction_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Prediction" ("gameId", "id", "prediction", "teamId", "userId") SELECT "gameId", "id", "prediction", "teamId", "userId" FROM "Prediction";
DROP TABLE "Prediction";
ALTER TABLE "new_Prediction" RENAME TO "Prediction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
