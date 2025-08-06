-- CreateEnum
CREATE TYPE "public"."Genre" AS ENUM ('FICTION', 'NON_FICTION', 'FANTASY', 'CLASSIC', 'DYSTOPIAN');

-- CreateTable
CREATE TABLE "public"."Book" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "genre" "public"."Genre" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
