-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "completedAt" TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
