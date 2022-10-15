-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "versionName" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isActivity" BOOLEAN NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivacyPolicy" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "app_id" TEXT NOT NULL,

    CONSTRAINT "PrivacyPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "App_version_key" ON "App"("version");

-- CreateIndex
CREATE UNIQUE INDEX "App_versionName_key" ON "App"("versionName");

-- CreateIndex
CREATE UNIQUE INDEX "PrivacyPolicy_app_id_key" ON "PrivacyPolicy"("app_id");

-- AddForeignKey
ALTER TABLE "PrivacyPolicy" ADD CONSTRAINT "PrivacyPolicy_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
