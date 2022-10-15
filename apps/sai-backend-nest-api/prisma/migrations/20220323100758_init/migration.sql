/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `ActivityDay` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `App` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `PersonalInformation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `PostComment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `PostImage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `PostVideo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `PrivacyPolicy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Questionnaire` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `UserActivity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `UserHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Activity_id_key" ON "Activity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityDay_id_key" ON "ActivityDay"("id");

-- CreateIndex
CREATE UNIQUE INDEX "App_id_key" ON "App"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInformation_id_key" ON "PersonalInformation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PostComment_id_key" ON "PostComment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PostImage_id_key" ON "PostImage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PostVideo_id_key" ON "PostVideo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PrivacyPolicy_id_key" ON "PrivacyPolicy"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Questionnaire_id_key" ON "Questionnaire"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserActivity_id_key" ON "UserActivity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserHistory_id_key" ON "UserHistory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Workout_id_key" ON "Workout"("id");
