-- CreateTable
CREATE TABLE "Highlight" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "Highlight_pkey" PRIMARY KEY ("id")
);
