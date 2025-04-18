/*
  Warnings:

  - You are about to drop the `SEO` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SEO" DROP CONSTRAINT "SEO_pageId_fkey";

-- DropTable
DROP TABLE "SEO";

-- CreateTable
CREATE TABLE "seo" (
    "id" SERIAL NOT NULL,
    "pageType" TEXT NOT NULL,
    "pageId" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "canonical" TEXT,
    "robots" TEXT NOT NULL DEFAULT 'index,follow',
    "schema" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sitemap" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "priority" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "frequency" TEXT NOT NULL DEFAULT 'weekly',
    "lastmod" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sitemap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "seo_pageId_key" ON "seo"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "sitemap_url_key" ON "sitemap"("url");

-- AddForeignKey
ALTER TABLE "seo" ADD CONSTRAINT "seo_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "campaigns"("id") ON DELETE SET NULL ON UPDATE CASCADE;
